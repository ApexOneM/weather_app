import { Link, Spacer, Tooltip } from "@nextui-org/react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="md:col-span-4 col-span-1 col-start-1 md:row-span-1 row-span-2 md:row-start-11 row-start-22 flex md:justify-between justify-center items-center md:px-8 md:flex-row flex-col-reverse md:gap-0 gap-1 md:mt-0">
            <div className="flex justify-center items-center">
                All Data Provided By-&nbsp;{" "}
                <Link href="https://openweathermap.org">OpenWeather</Link>
                ,&nbsp;
                <Link href="https://www.openuv.io/">OpenUV</Link>
            </div>
            <div className="flex justify-center items-center md:flex-row flex-col">
                <Link href={process.env.PORTFOLIO} className="cursor-pointer">
                    © Muzaffar Shaikh
                </Link>
                <Spacer x={2} />
                <div className="flex justify-center items-center gap-1">
                    <Tooltip content="GitHub">
                        <Link href={process.env.GITHUB} color="foreground">
                            <FaGithub className="w-10" />
                        </Link>
                    </Tooltip>
                    <Tooltip content="LinkedIn">
                        <Link href={process.env.LINKEDIN} color="foreground">
                            <FaLinkedin className="w-10" />
                        </Link>
                    </Tooltip>
                    <Tooltip content="Email">
                        <Link
                            href={`mailto:${process.env.EMAIL}`}
                            color="foreground"
                        >
                            <MdEmail className="w-10" />
                        </Link>
                    </Tooltip>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
