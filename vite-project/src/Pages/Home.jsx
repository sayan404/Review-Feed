import React from 'react'
import Filters from '../Components/Layout/Filters'
import ReviewSection from '../Components/Layout/ReviewSection'
import './Home.css'
const Home = () => {
    
    return (
        <div className='mainParentContainer'>
            <div className='filterMainContainer'>
                <Filters />
            </div>
            <div className='reviewMainContainer'>
               <ReviewSection />
            </div>
        </div>
    )
}

export default Home