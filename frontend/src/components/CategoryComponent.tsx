import LogoNike from "../assets/image/LogoNike.jpg";
import LogoPuma from "../assets/image/LogoPuma.jpg";
import LogoLining from "../assets/image/LogoLining.jpg";
import LogoAdidas from "../assets/image/LogoAdidas.png";
import LogoGucci from "../assets/image/LogoGucci.jpeg";
import LogoDior from "../assets/image/LogoDior.jpg";
import LogoBalenciaga from "../assets/image/LogoBalenciaga.jpg";
import LogoVans from "../assets/image/LogoVans.jpeg";
import LogoMlb from "../assets/image/LogoMlb.jpeg";


const logos = [
    {
        title: "Nike",
        image: LogoNike
    },
    {
        title: "Puma",
        image: LogoPuma
    },
    {
        title: "Adidas",
        image: LogoAdidas
    },
    {
        title: "Lining",
        image: LogoLining
    },
    {
        title: "Balenciaga",
        image: LogoBalenciaga
    },
    {
        title: "Gucci",
        image: LogoGucci
    },
    {
        title: "Dior",
        image: LogoDior
    },
    {
        title: "MLB",
        image: LogoMlb
    },
    {
        title: "Vans",
        image: LogoVans
    }
];

export const CategoryComponent = () => {

    return (
        <>
        {logos.map((logo, index) => (
             <div key={index}>
             <div className="size-28 ">
               <img src={logo.image} alt={`logo ${logo.title}`} className="w-full h-full" />
             </div>
             <p className="text-center text-lg font-semibold">{logo.title}</p>
           </div>
        ))}
        </>
    )
}
