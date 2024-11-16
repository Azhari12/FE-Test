import {
	Avatar,
	Box,
	Burger,
	Divider,
	Drawer,
	Group,
	Menu,
	rem,
	ScrollArea,
	Text,
	UnstyledButton,
} from "@mantine/core";
import classes from "./HeaderMegaMenu.module.css";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { UserType } from "@/lib/types/user";
import { LiaBell } from "react-icons/lia";
import { Link, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { IoChevronDownOutline, IoLogOutOutline } from "react-icons/io5";
import { Cookies } from "react-cookie";
import { cn } from "@/lib/utils";

const HeaderLayout = () => {
	const navigate = useNavigate();
	const cookies = new Cookies();

	const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
		useDisclosure(false);
	const [user, setUser] = useState<UserType>();
	const [userMenuOpened, setUserMenuOpened] = useState(false);

	const onLogout = () => {
		cookies.remove("dummyToken", { path: "/" });
		navigate("/login");
	};

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	return (
		<Box py={10} px={5} className="bg-white border-b">
			<header className={cn(classes.header, "!border-b-0")}>
				<Group justify="space-between" h="100%">
					<h1 className="font-bold text-lg">Warehouse Management System</h1>

					<Group h="100%" gap={30} visibleFrom="sm">
						<div className="relative">
							<div className="bg-red-500 rounded-xl py-1 px-3 absolute -right-7 -top-5 text-sm text-white">
								11
							</div>
							<LiaBell size={25} />
						</div>

						<Menu
							width={260}
							position="bottom-end"
							transitionProps={{ transition: "pop-top-right" }}
							onClose={() => setUserMenuOpened(false)}
							onOpen={() => setUserMenuOpened(true)}
							withinPortal
						>
							<Menu.Target>
								<UnstyledButton
									className={clsx(classes.user, {
										[classes.userActive]: userMenuOpened,
									})}
								>
									<Group gap={7}>
										<Avatar
											src="https://s3-alpha-sig.figma.com/img/d3cb/19c0/a69c0dc2445bb8e7c73edd99c09aef09?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PzkWXBKk6OIbhqxnIdIiLM10ETp2hkTwqgQbfpbI45RwtN1zWkD10dzd5KPi8H0Ox7gcmrH-Htn08WqUYhZQCiIw3y~94MjyvMkxCV125wwvyXJxapTsr6ozTPu5GtDwtH48asaP2egIwExtisuXDMu1W2a3zI9vlZPgd~JfxtbqqC08mtspuHjE4FfClCghqsAHFyFeDluUm9EWrt1SctNnm9O0hBzdJAJHScoc2aSifCoiDG02HDdVnmTdq4vE3HEg2n0UVA46Kf4QQ1~ylZIn92ep3g4ySJFTN4vMxPwQpgY3XIDa-PAHL2ova44QuTRCL8NEr7LV8tzvhQPgwQ__"
											alt={user?.name}
											radius="xl"
											size={30}
										/>
										<Text fw={500} size="sm" lh={1} mr={3}>
											{user?.name}
										</Text>
										<IoChevronDownOutline style={{ width: rem(12), height: rem(12) }} />
									</Group>
								</UnstyledButton>
							</Menu.Target>
							<Menu.Dropdown>
								<Menu.Item
									leftSection={
										<IoLogOutOutline style={{ width: rem(16), height: rem(16) }} />
									}
									onClick={onLogout}
								>
									Logout
								</Menu.Item>
							</Menu.Dropdown>
						</Menu>
					</Group>

					<Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
				</Group>
			</header>

			<Drawer
				opened={drawerOpened}
				onClose={closeDrawer}
				size="100%"
				padding="md"
				title={
					<div className="flex gap-3 items-center">
						<img
							alt="user_image"
							className="rounded-full aspect-square w-7 h-7"
							src="https://s3-alpha-sig.figma.com/img/d3cb/19c0/a69c0dc2445bb8e7c73edd99c09aef09?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=PzkWXBKk6OIbhqxnIdIiLM10ETp2hkTwqgQbfpbI45RwtN1zWkD10dzd5KPi8H0Ox7gcmrH-Htn08WqUYhZQCiIw3y~94MjyvMkxCV125wwvyXJxapTsr6ozTPu5GtDwtH48asaP2egIwExtisuXDMu1W2a3zI9vlZPgd~JfxtbqqC08mtspuHjE4FfClCghqsAHFyFeDluUm9EWrt1SctNnm9O0hBzdJAJHScoc2aSifCoiDG02HDdVnmTdq4vE3HEg2n0UVA46Kf4QQ1~ylZIn92ep3g4ySJFTN4vMxPwQpgY3XIDa-PAHL2ova44QuTRCL8NEr7LV8tzvhQPgwQ__"
						/>
						<p>{user?.name}</p>
					</div>
				}
				hiddenFrom="sm"
				zIndex={1000000}
			>
				<ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
					<Divider my="sm" />
					<div className="flex flex-col">
						<Link to="#" className=" w-full hover:bg-slate-200 p-3">
							Notifikasi (11)
						</Link>
						<a href="#" className=" w-full hover:bg-slate-200 p-3">
							Logout
						</a>
					</div>
				</ScrollArea>
			</Drawer>
		</Box>
	);
};

export default HeaderLayout;
