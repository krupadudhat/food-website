import Herosection from '../../Sections/HomePage/herosection/Herosection'
import FastestFoodBanner from '../../Sections/HomePage/FastestFoodBanner/FastestFoodBanner'
import PopulerRecipesLists from '../../Sections/HomePage/PopulerRecipes/PopulerRecipesLists'
import DiningOut from '../../Sections/HomePage/DiningOut/DiningOut'
import ScrollButton from '../../components/ScrollTop/ScrollTop'
import Footer from '../../components/Footer/Footer'

const Home = () => {
  return (
    <div>
        <Herosection/>
        <DiningOut/>
        <PopulerRecipesLists/>
        <FastestFoodBanner/>
        <hr/>
        <ScrollButton/>
        <Footer/>
    </div>
  )
}

export default Home