"use client";

import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Button,
    Tooltip,
    useDisclosure,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    Skeleton,
    Spacer,
} from "@nextui-org/react";
import Image from "next/image";

import MainLogo from "../icon.svg";
import { MdSunny } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoMdMoon } from "react-icons/io";
import { MdOutlineLocationSearching } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";
import { TiWarning } from "react-icons/ti";

import { KeyboardEvent, useContext, useEffect, useMemo, useState } from "react";

import ThemeSwitch from "./ThemeSwitch";
import { GeolocationContext } from "../context/GeeolocationContext";
import { FaLocationDot } from "react-icons/fa6";

type Props = {
    handleCords: (value: { lat: number; lon: number } | null) => void;
};

const Header = ({ handleCords }: Props) => {
    const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
    const [inputValue, setInputValue] = useState<string>("");
    const [change, setChange] = useState<string>("");
    const [cities, setCities] = useState<CityData | null>(null);
    const [isLoaded, setIsLoaded] = useState<boolean>(true);

    const { navigatorIsAllowed } = useContext(GeolocationContext);

    const validateInput = (value: string) => value.match(/^[a-zA-Z\s]+$/);

    const handleModalClose = () => {
        onClose();
        setInputValue("");
        setChange("");
        setCities(null);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            setInputValue(change);
        }
    };

    const handleCurrentLocation = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                handleCords({ lat, lon });
            });
        }
    };

    const isInvalid = useMemo(() => {
        if (change === "") return false;

        return validateInput(change) ? false : true;
    }, [change]);

    useEffect(() => {
        if (inputValue !== "") {
            setIsLoaded(false);
            const fetchcities = async () => {
                const data = await fetch(`api/city?query=${inputValue}`)
                    .then((res: any) => {
                        if (res.status === 200) {
                            return res.json();
                        } else {
                            return {
                                status: res.status,
                                message: res.message,
                            };
                        }
                    })
                    .catch((err) => {
                        status: 500;
                        message: err.message;
                    });

                setCities(data);
                setInputValue("");
                setIsLoaded(true);
            };

            fetchcities();
        }
    }, [inputValue]);

    return (
        <Navbar
            isBlurred={false}
            maxWidth="full"
            // isBordered
            className="col-span-4 row-span-1 row-start-1"
        >
            <NavbarBrand>
                <NavbarBrand className="align-baseline">
                    <Image
                        width={30}
                        src={MainLogo}
                        alt="logo"
                        className="pb-1"
                    />
                    <Spacer x={2} />
                    <p className="font-bold text-inherit text-xl">Weather</p>
                </NavbarBrand>
            </NavbarBrand>
            <NavbarContent data-justify="flex-end" className="gap-1">
                <NavbarItem>
                    {navigatorIsAllowed ? (
                        <Tooltip content="Current location">
                            <Button
                                color="default"
                                isIconOnly
                                aria-label="Current location"
                                radius="full"
                                size="sm"
                                variant="light"
                                onClick={handleCurrentLocation}
                            >
                                <MdOutlineLocationSearching size={"1.2rem"} />
                            </Button>
                        </Tooltip>
                    ) : (
                        <Tooltip
                            content="To get weather updates for the current location please allow location access"
                            color="danger"
                        >
                            <Button
                                color="danger"
                                isIconOnly
                                aria-label="Current location"
                                radius="full"
                                size="sm"
                                variant="light"
                            >
                                <MdOutlineLocationSearching size={"1.2rem"} />
                            </Button>
                        </Tooltip>
                    )}
                </NavbarItem>
                <NavbarItem className="md:block hidden pr-4">
                    <Button
                        color="default"
                        aria-label="Search City"
                        // @ts-ignore
                        radius="medium"
                        size="sm"
                        endContent={<FiSearch size={"1.2rem"} />}
                        onClick={() => onOpen()}
                    >
                        Search cities...
                    </Button>
                </NavbarItem>
                <NavbarItem className="md:hidden pr-4">
                    <Button
                        color="default"
                        isIconOnly
                        aria-label="Search City"
                        radius="full"
                        size="sm"
                        variant="light"
                        onClick={() => onOpen()}
                    >
                        <FiSearch size={"1.2rem"} />
                    </Button>
                </NavbarItem>
                <Modal
                    size={"md"}
                    isOpen={isOpen}
                    onClose={handleModalClose}
                    onOpenChange={onOpenChange}
                    placement="center"
                >
                    <ModalContent>
                        {(handleModalClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Search Cities...
                                    <Input
                                        autoFocus
                                        isClearable
                                        type="text"
                                        name="search"
                                        className="mb-2"
                                        placeholder="City, Country Code"
                                        value={change}
                                        isInvalid={isInvalid}
                                        color={isInvalid ? "danger" : "default"}
                                        errorMessage={
                                            isInvalid &&
                                            "Please enter a valid city or country code"
                                        }
                                        onKeyDown={(e) => handleKeyDown(e)}
                                        onChange={(e) => {
                                            if (e.target.value.trim() === "") {
                                                setChange("");
                                                setCities(null);
                                            }

                                            setChange(e.target.value);
                                        }}
                                        onClear={() => {
                                            setInputValue("");
                                            setChange("");
                                            setCities(null);
                                        }}
                                        startContent={
                                            <Button
                                                color="default"
                                                isIconOnly
                                                aria-label="Search City"
                                                radius="full"
                                                size="sm"
                                                variant="light"
                                                onClick={() =>
                                                    setInputValue(change)
                                                }
                                            >
                                                <FiSearch size={"1.2rem"} />
                                            </Button>
                                        }
                                    />
                                </ModalHeader>
                                <ModalBody>
                                    {!isLoaded ? (
                                        <Skeleton
                                            isLoaded={isLoaded}
                                            className="rounded-lg"
                                        >
                                            <Button
                                                fullWidth={true}
                                                isDisabled
                                            ></Button>
                                        </Skeleton>
                                    ) : (cities?.length as number) > 0 ? (
                                        cities?.map((city, index) => {
                                            return (
                                                <Button
                                                    key={index}
                                                    color="default"
                                                    endContent={
                                                        <MdArrowForwardIos />
                                                    }
                                                    fullWidth={true}
                                                    variant="light"
                                                    className="flex flex-row items-center justify-between"
                                                    onClick={() => {
                                                        handleModalClose();
                                                        handleCords({
                                                            lat: city.lat,
                                                            lon: city.lon,
                                                        });
                                                    }}
                                                >
                                                    {city.state
                                                        ? `${city.name}, ${city.state}, ${city.country}`
                                                        : `${city.name}, ${city.country}`}
                                                </Button>
                                            );
                                        })
                                    ) : (
                                        cities?.length === 0 && (
                                            <Button
                                                color="warning"
                                                startContent={<TiWarning />}
                                                fullWidth={true}
                                                variant="light"
                                                className="flex flex-row items-center justify-start gap-2"
                                                onClick={() => {
                                                    handleModalClose();
                                                }}
                                            >
                                                City Not Found
                                            </Button>
                                        )
                                    )}
                                </ModalBody>
                            </>
                        )}
                    </ModalContent>
                </Modal>
                <NavbarItem>
                    <ThemeSwitch />
                </NavbarItem>
            </NavbarContent>
        </Navbar>
    );
};

export default Header;
