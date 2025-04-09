import BestSeller from "../components/BestSeller"
import Categories from "../components/Categories"
import MainBanner from "../components/MainBanner"


const Home = () => {
  return (
    <div className="mt-10">
        <MainBanner />
        <Categories />
        <BestSeller />
    </div>
  )
}

export default Home