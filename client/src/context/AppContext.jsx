import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast"
import axiosInstance from "../api/axios";

export const AppContext = createContext()


export const AppContextProvider = ({ children }) => {
    const currency = import.meta.env.VITE_CURRENCY
    const navigate = useNavigate()
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setShowUserLogin] = useState(false)
    const [products, setProducts] = useState([])
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 10,
        total: 0
    })


    const fetchSeller = async () => {
        try {
            const { data } = await axiosInstance.get("/seller/is-auth")
            if (data.success) {
                setIsSeller(true)
            } else {
                setIsSeller(false)
            }
        } catch (error) {
            setIsSeller(false)
        }
    }
    const logoutSeller = async () => {
        try {
            const { data } = await axiosInstance.get("/seller/logout")
            if (data.success) {
                setIsSeller(false)
                setProducts([]) // opcional: limpa os produtos
                setPagination({ page: 1, limit: 10, total: 0 }) // reseta paginação
                toast.success("Seller logged out")

            }
        } catch (error) {
            toast.error("Failed to logout")
        }
    }




    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart')
        return savedCart ? JSON.parse(savedCart) : {}
    });
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])
    const [searchQuery, setSearchQuery] = useState("")


    const fetchProducts = async () => {
        try {
            const { data } = await axiosInstance.get(`/product/list?page=${pagination.page}&limit=${pagination.limit}`);

            if (data.success) {
                if (isSeller || pagination.page === 1) {
                    // Substitui os produtos na primeira página ou se for seller
                    setProducts(data.data);
                } else {
                    // Append para usuários normais em páginas > 1
                    setProducts(prev => [...prev, ...data.data]);
                }

                setPagination(prev => ({
                    ...prev,
                    total: data.pagination.total,
                    pages: data.pagination.pages
                }));
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch products");
        }
    };




    const changePage = (newPage) => {
        setPagination((prev) => ({
            ...prev,
            page: newPage
        }));
    };

    const addToCart = async (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] += 1
        } else {
            cartData[itemId] = 1
        }
        setCartItems(cartData)
        toast.success("Added to Cart")
    }

    const updateCartItem = (itemId, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId] = quantity
        setCartItems(cartData)
        toast.success("Cart Updated")
    }

    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems)
        if (cartData[itemId]) {
            cartData[itemId] -= 1
            if (cartData[itemId] === 0) {
                delete cartData[itemId]
            }
        }
        toast.success("Removed from cart")
        setCartItems(cartData)
    }

    const getCartCount = () => {
        let totalCount = 0;
        for (const item in cartItems) {
            totalCount += cartItems[item]
        }
        return totalCount
    }

    const getCartAmount = () => {
        let totalAmount = 0

        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items)
            if (itemInfo && cartItems[items] > 0) {
                totalAmount += itemInfo.offerPrice * cartItems[items]
            }
        }
        return Math.floor(totalAmount * 100) / 100
    }
    useEffect(() => {
        fetchSeller()
    }, [])

    // Atualiza os produtos quando seller muda
    useEffect(() => {
        if (isSeller) {
            setProducts([]);
            setPagination(prev => ({ ...prev, page: 1 }));
        }
    }, [isSeller]);


    // Busca produtos sempre que página ou seller mudar
    useEffect(() => {
        fetchProducts();
    }, [pagination.page, isSeller]);

    // Infinite scroll só para usuários comuns
    useEffect(() => {
        if (!isSeller) {
            const handleScroll = () => {
                if (
                    window.innerHeight + document.documentElement.scrollTop + 1 >=
                    document.documentElement.offsetHeight
                ) {
                    if (pagination.page < pagination.pages) {
                        changePage(pagination.page + 1);
                    }
                }
            };

            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [pagination.page, isSeller, pagination.pages]);



    const value = { navigate, user, setIsSeller, setUser, isSeller, showUserLogin, setShowUserLogin, products, currency, addToCart, updateCartItem, removeFromCart, cartItems, searchQuery, setSearchQuery, getCartCount, getCartAmount, changePage, pagination, fetchProducts, logoutSeller }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}


export const useAppContext = () => {
    return useContext(AppContext)
}