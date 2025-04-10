import BestSeller from "../components/BestSeller"
import BottomBanner from "../components/BottomBanner"
import Categories from "../components/Categories"
import MainBanner from "../components/MainBanner"


const Home = () => {
  return (
    <div className="mt-10">
        <MainBanner />
        <Categories />
        <BestSeller />
        <BottomBanner />
    </div>
  )
}

export default Home