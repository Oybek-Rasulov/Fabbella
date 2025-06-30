import Title from "./Title";
import Product from "../features/Products/Products";
import Category from "../features/Category/Category";

export default function Home() {
    return ( <>
            <Title title={'Katalog'} />
            <Category />
            <Title title={'Kiyimlar'} className="mt2" />
            <Product />
        </>
    )
}
