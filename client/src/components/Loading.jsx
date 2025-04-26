import { useLocation } from "react-router";
import { useAppContext } from "../context/AppContext";
import { useEffect } from "react";

const Loading = () => {
    const { navigate, setCartItems } = useAppContext();
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const nextUrl = query.get('next');
    const paymentStatus = query.get('payment');

    
    useEffect(() => {
        if (paymentStatus === "success") {
            setCartItems({});
        }
    }, [paymentStatus, setCartItems]);

    
    useEffect(() => {
        if (nextUrl) {
            setTimeout(() => {
                navigate(`/${nextUrl}`);
            }, 5000);
        }
    }, [nextUrl, navigate]);

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-24 w-24 border-4 border-gray-300 border-t-primary"></div>
        </div>
    );
};

export default Loading;