import { Carousel } from 'antd';
import assets from '../../services/assets'


export default function NormalCategory({ categoryValue }) {
    const contentStyle = {
        margin: 0,
        height: '160px',
        color: '#fff',
      };

    const categoryText = {
      color: "#fff",
      fontWeight: 'bold',
      fontSize: "1rem"
    }

      function handleCategory(value) {
        categoryValue(value)
      }

    return (
      <Carousel arrows infinite={true} autoplay autoplaySpeed={2000} aria-hidden="false">
        <div>
          <div className="category">
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('All')}}><img src={assets.categoryIcon} alt="All" /><p style={categoryText}>Hammasi</p></button>
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Dress')}}><img src={assets.dress} alt="Dress" /><p style={categoryText}>Ko'ylaklar</p></button>
            </div>
            {/* <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Makeup')}}><img src={assets.makeup} alt="Dress" /><p style={categoryText}>Makiaj olami</p></button>
            </div> */}
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Pant')}}><img src={assets.pant} alt="Dress" /><p style={categoryText}>Shimlar</p></button>
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Coat')}}><img src={assets.coat} alt="Dress" /><p style={categoryText}>Paltolar</p></button>                
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Jacket')}}><img src={assets.jacket} alt="Dress" /><p style={categoryText}>Kurtkalar</p></button>                
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Scarf')}}><img src={assets.scarf} alt="Dress" /><p style={categoryText}>Sharflar</p></button>                
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Headdress')}}><img src={assets.cap} alt="Dress" /><p style={categoryText}>Bosh kiyimlari</p></button>
            </div>
          </div>
        </div>

        <div>
        <div className="category">
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Sweater')}}><img src={assets.sweater} alt="Dress" /><p style={categoryText}>Sviterlar</p></button>
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Skirt')}}><img src={assets.skirt} alt="Dress" /><p style={categoryText}>Yubkalar</p></button>
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Short')}}><img src={assets.short} alt="Dress" /><p style={categoryText}>Shortiklar</p></button>
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Pijama')}}><img src={assets.pijama} alt="Dress" /><p style={categoryText}>Pijamalar</p></button>
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Shoes')}}><img src={assets.shoes} alt="Dress" /><p style={categoryText}>Tuflilar</p></button>
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('Shoes2')}}><img src={assets.shoes2} alt="Dress" /><p style={categoryText}>Krasovkalar</p></button>
            </div>
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('T-shirt')}}><img src={assets.tshirt} alt="Dress" /><p style={categoryText}>Futbolkalar</p></button>
            </div>
          </div>
        </div>
      </Carousel>
    )
  }