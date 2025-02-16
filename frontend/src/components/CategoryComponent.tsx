import LogoNike from "../assets/image/LogoNike.jpg";
import LogoPuma from "../assets/image/LogoPuma.jpg";
import LogoLining from "../assets/image/LogoLining.jpg";
import LogoAdidas from "../assets/image/LogoAdidas.png";
import LogoGucci from "../assets/image/LogoGucci.jpeg";
import LogoDior from "../assets/image/LogoDior.jpg";
import LogoBalenciaga from "../assets/image/LogoBalenciaga.jpg";
import LogoVans from "../assets/image/LogoVans.jpeg";
import LogoMlb from "../assets/image/LogoMlb.jpeg";
import { Link, Navigate } from "react-router";


const Brands = [
        {
            title: "Nike",
            image: LogoNike,
            key: "nike"
        },
        {
            title: "Puma",
            image: LogoPuma,
            key: "puma"
        },
        {
            title: "Adidas",
            image: LogoAdidas,
            key: "adidas"
        },
        {
            title: "Lining",
            image: LogoLining,
            key: "lining"
        },
        {
            title: "Balenciaga",
            image: LogoBalenciaga,
            key: "balenciaga"
        },
        {
            title: "Gucci",
            image: LogoGucci,
            key: "gucci"
        },
        {
            title: "Dior",
            image: LogoDior,
            key: "dior"
        },
        {
            title: "MLB",
            image: LogoMlb,
            key: "mlb"
        },
        {
            title: "Vans",
            image: LogoVans,
            key: "vans"
        }
    ];

export const CategoryComponent = () => {

    return (
        <>
            {Brands.map((brand, index) => (
                <Link to={`/type-product/${brand.key}`} key={index}>
                    <div className="size-28 ">
                        <img src={brand.image} alt={`logo ${brand.title}`} className="w-full h-full" />
                    </div>
                    <p className="text-center text-lg font-semibold">{brand.title}</p>
                </Link>
            ))}
        </>
    )
}
