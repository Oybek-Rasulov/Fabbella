import { Carousel } from 'antd';
import assets from '../../services/assets'

export default function ResponsiveCategory({categoryValue}) {
    const contentStyle = {
        margin: 0,
        height: '160px',
        color: '#333',
      };

      function handleCategory(value) {
        categoryValue(value)
      }  

    return (
      <Carousel arrows infinite={true} autoplay autoplaySpeed={2000}>
          <div>
            <div className="category">
            <div style={contentStyle} className="category-content">
              <button type='submit' onClick={ () => {handleCategory('All')}}><img src={assets.categoryIcon} alt="All" /><p>Hammasi</p></button>
            </div>
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Dress')}}><img src={assets.dress} alt="Dress" /><p>Ko'ylaklar</p></button>
              </div>
              {/* <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Makeup')}}><img src={assets.makeup} alt="Dress" /><p>Makiaj olami</p></button>
              </div> */}
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Pant')}}><img src={assets.pant} alt="Dress" /><p>Shimlar</p></button>
              </div>
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Coat')}}><img src={assets.coat} alt="Dress" /><p>Paltolar</p></button>                
              </div>
            </div>
          </div>

          <div>
            <div className="category">
            <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Jacket')}}><img src={assets.jacket} alt="Dress" /><p>Kurtkalar</p></button>                
              </div>
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Scarf')}}><img src={assets.scarf} alt="Dress" /><p>Sharflar</p></button>                
              </div>
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Headdress')}}><img src={assets.cap} alt="Dress" /><p>Bosh kiyimlari</p></button>
              </div>
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Sweater')}}><img src={assets.sweater} alt="Dress" /><p>Sviterlar</p></button>
              </div>
            </div>
          </div>

          <div>
          <div className="category">
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Skirt')}}><img src={assets.skirt} alt="Dress" /><p>Yubkalar</p></button>
              </div>
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Short')}}><img src={assets.short} alt="Dress" /><p>Shortiklar</p></button>
              </div>
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Pijama')}}><img src={assets.pijama} alt="Dress" /><p>Pijamalar</p></button>
              </div>
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Shoes')}}><img src={assets.shoes} alt="Dress" /><p>Tuflilar</p></button>
              </div>
            </div>
          </div>

          <div>
            <div className="category">
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Shoes2')}}><img src={assets.shoes2} alt="Dress" /><p>Krasovkalar</p></button>
              </div>
              <div style={contentStyle} className="category-content">
                <button type='submit' onClick={ () => {handleCategory('Tshirt')}}><img src={assets.tshirt} alt="Dress" /><p>Futbolkalar</p></button>
              </div>
            </div>
          </div>
      </Carousel>
    )
  }
