import logo from "../../public/Background.png"
import Image from "next/image"

export default function Header(){

    return(
        <header className="h-[70] w-full bg-[#F7FBFA] border-b-2 border-[#E5E5E5] flex items-center justify-center">
            <nav className="flex flex-row items-center justify-center between ">
             <Image className="mr-2" src={logo} alt="foto" width={25} height={25} />  <h1 className=" font-bold text-[#0F1720]">Olhar</h1><span className=" font-bold text-[#0F1720]">de</span><h1 className="font-bold text-[#0F1720]">Fisio</h1>
            </nav>

            

        </header>
    )
}