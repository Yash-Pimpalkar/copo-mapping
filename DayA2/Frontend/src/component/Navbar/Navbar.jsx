import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api.js";
import logo from '../Pagination/maplms.png';

function ProfileDropdown({ email, onSignOut }) {
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <img
            alt=""
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            className="h-8 w-8 rounded-full"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <MenuItem>
          <NavLink
            to="#"
            className="block px-4 py-2 text-sm sm:text-base text-gray-700 hover:bg-gray-100 truncate"
            title={email} // Show full email on hover
            role="menuitem"
          >
            {isTruncated ? `${email.slice(0, 20)}...` : email}
          </NavLink>
        </MenuItem>
        {/* <MenuItem>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Settings
          </a>
        </MenuItem> */}
        <MenuItem>
          <NavLink
            onClick={onSignOut}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Sign out
          </NavLink>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const [token, setToken] = useState("");
  const [user_id, setUID] = useState(0);
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState(0);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    const storedUserType = window.localStorage.getItem("user_type");
    console.log(storedUserType!=1)
    if (storedToken && storedUserType && storedUserType!=1) {
      setToken(storedToken);
      setUserType(parseInt(storedUserType));

      const uid = window.localStorage.getItem("uid");
      const isRegister = window.localStorage.getItem("isregister");
      if (uid && isRegister) {
        setUID(parseInt(uid));
        const fetchEmail = async () => {
          try {
            const response = await api.post(`api/register/getemail/${uid}`);
            console.log(response.data)
            if (response.data && response.data.length > 0) {
              setEmail(response.data[0].emailid);
            }
          } catch (err) {
            console.error("Failed to fetch email:", err);
          }
        };
        fetchEmail();
      }
    }else if (storedToken && storedUserType == 1) {
      setToken(storedToken);
      setUserType(parseInt(storedUserType));

  
      const uid = window.localStorage.getItem("uid");
      console.log(uid)
      const isRegister = window.localStorage.getItem("isregister");
      if (uid && isRegister) {
        setUID(parseInt(uid));
        const fetchStudentEmail = async () => {
          try {
            const response = await api.get(`api/register/student/getemail/${uid}`);
            console.log(response.data)
            if (response.data && response.data.length > 0) {
              setEmail(response.data[0].emailid);
              console.log(email)
            }
          } catch (err) {
            console.error("Failed to fetch email:", err);
          }
        };
        fetchStudentEmail();
      }
    }
    
  }, []);

  const handleSignOut = () => {
    navigate("/");
    localStorage.clear();
    window.location.reload();
  };

  const navigation = [
    { name: "LMS", href: "/", userTypes: [1] },
    { name: "Classroom", href: "/viewclassroom", userTypes: [1] },
    { name: "Upcoming Events", href: "/upcoming", userTypes: [1] },
    { name: "Progress Tracker", href: "/", userTypes: [1] },
    { name: "Announcement", href: "/", userTypes: [1] },
    { name: "Feedback", href: "/feedback-student", userTypes: [1] },
    { name: "Edit POs", href: "/editpos", userTypes:[3] },
    { name: "Edit COs", href:"/editcos", userTypes:[3] },
    { name: "User Selection", href: "/userselection", userTypes: [3] },
    { name: "Assign Course", href: "/assigncourse", userTypes: [3] },
    { name: "Next Sem", href:"/nextsem", userTypes:[3] },
  ];

  const formNavigation = [
    { name: "PO Form", href: "/posform", userTypes: [2] },
    { name: "Add Course", href: "/courseform", userTypes: [2] },
    { name: "User Course Registration", href: "/registerform", userTypes: [2] },
    { name: "User Course", href: "/usercourse", userTypes: [2] },
  ];

  const formCurriculum = [
    { name: "IA1", href: "/ia1", userTypes: [2] },
    { name: "IA2", href: "/ia2", userTypes: [2] },
    { name: "Semester", href: "/semester", userTypes: [2] },
    // { name: "Practical", href: "/practical", userTypes: [2] },
    { name: "Termwork", href: "/termwork", userTypes: [2] },
    { name: "Oral/Practical", href: "/oralpractical", userTypes: [2] },
    { name: "Oral (PCE)", href: "/oralpce", userType: [2] },
    // { name: "Assignment", href: "/assg", userTypes: [2] },
    { name: "copo", href: "/coposhow", userTypes: [2] },
  ];

  const resultNavigation = [
    { name: "Results", href: "/mainresult", userTypes: [2] },
  ];

  const questionNavigation = [
    { name: "Upload Ia1", href: "/uploadia1", userType: [2] },
    { name: "Upload Ia2", href: "/uploadia2", userType: [2] },
    { name: "Upload Sem", href: "/uploadsem", userType: [2] },
    { name: "Upload Termwork", href: "/uploadtermwork", userTypes: [2] },
    // { name: "Upload Practical", href: "/uploadpractical", userType: [2] },
    { name: "Upload Oral", href: "/uploadoral", userType: [2] },
    { name: "Upload Oral(PCE)", href: "/uploadoralpce", userType: [2] },
  ];

  // const TermworkNavigation = [
  //   // { name:"Upload Theory only", href:"uploadthonly", userType: [2]},
  //   { name: "Upload Theory+Assignment", href: "/theoryassg", userType: [2] },
  //   // { name:"Upload Practical Internal", href:"uploadprinternal", userType: [2]},
  //   // { name:"Upload Pract hav MiniPro", href:"uploadprhavminipro", userType: [2]},
  //   // { name:"Upload Pure Practical", href:"uploadpurepract", userType: [2]},
  //   // { name:"Upload Pracical 10+10(mini)+5", href:"uploadpr10", userType: [2]},
  // ];

  const ProjectNavigation = [
    { name: "Upload Major Project", href: "/uploadmajorprosem ", userType: [2] },
    { name: "Upload Mini Project", href: "/uploadminiprosem ", userType: [2] },
    { name: "Major Project", href: "/majorprosem ", userType: [2] },
    { name: "Mini Project", href: "/miniprosem ", userType: [2] },
  ];

  const lmsNavigation = [
    // Teacher's navigation (userType: 2)
    { name: "Dashboard", href: "/Teacherlmsdashboard", userTypes: [2] },
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              <XMarkIcon className="h-6 w-6 hidden" aria-hidden="true" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="MAPLMS"
                src={logo}
                className="h-8 w-auto cursor-pointer"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex items-center space-x-4">
                {token && user_id !== 0 && (
                  <>
                    {navigation
                      .filter((item) => item.userTypes.includes(userType))
                      .map((item) => (
                        <NavLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    {userType === 2 && (
                      <>
                        <Menu as="div" className="relative">
                          <MenuButton onClick={() => navigate("/")} className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Home
                          </MenuButton>
                        </Menu>
                        <Menu as="div" className="relative">
                          <MenuButton className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Form
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            {formNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu>
                        <Menu as="div" className="relative">
                          <MenuButton className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Questions
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            {questionNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu>
                        <Menu as="div" className="relative">
                          <MenuButton className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Curriculum
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            {formCurriculum.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu>
                        <Menu as="div" className="relative">
                          <Link
                            to="/showtermwork"
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                          >
                            TermWork
                          </Link>
                        </Menu>

                        <Menu as="div" className="relative">
                          <MenuButton className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Projects
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            {ProjectNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu>
                        <Menu as="div" className="relative">
                          <MenuButton className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Results
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            {resultNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu>
                        <Menu as="div" className="relative ml-4">
                          {" "}
                          {/* Adjust the margin for spacing */}
                          <MenuButton className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            LMS
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            {lmsNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu>
                        {/* <Menu as="div" className="relative">
                          <MenuButton className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                            Questions
                          </MenuButton>
                          <MenuItems className="absolute right-0 z-50 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                            {questionNavigation.map((item) => (
                              <MenuItem key={item.name}>
                                {({ active }) => (
                                  <NavLink
                                    to={item.href}
                                    className={classNames(
                                      active ? 'bg-gray-100' : '',
                                      'block px-4 py-2 text-sm text-gray-700'
                                    )}
                                  >
                                    {item.name}
                                  </NavLink>
                                )}
                              </MenuItem>
                            ))}
                          </MenuItems>
                        </Menu> */}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {token && email && (
              <ProfileDropdown email={email} onSignOut={handleSignOut} />
            )}
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 pt-2 pb-3">
          {token && user_id !== 0 && (
            <>
              {navigation
                .filter((item) => item.userTypes.includes(userType))
                .map((item) => (
                  <DisclosureButton
                    key={item.name}
                    as={NavLink}
                    to={item.href}
                    className={classNames(
                      location.pathname === item.href
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block px-3 py-2 text-base font-medium"
                    )}
                  >
                    {item.name}
                  </DisclosureButton>
                ))}
              {userType === 2 && (
                <>
                  <Disclosure as="div" className="relative">
                    <DisclosureButton className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      Form
                    </DisclosureButton>
                    <DisclosurePanel className="space-y-1">
                      {formNavigation.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as={NavLink}
                          to={item.href}
                          className="block px-8 py-2 text-xs text-white hover:bg-gray-600 hover:text-white">
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <Disclosure as="div" className="relative">
                    <DisclosureButton className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      Questions
                    </DisclosureButton>
                    <DisclosurePanel className="space-y-1">
                      {questionNavigation.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as={NavLink}
                          to={item.href}
                          className="block px-8 py-2 text-xs text-white hover:bg-gray-600 hover:text-white"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <Disclosure as="div" className="relative">
                    <Link
                      to="/termwork"
                      className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      TermWork
                    </Link>
                    {/* <DisclosureButton className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      Term Work
                    </DisclosureButton>
                    <DisclosurePanel className="space-y-1">
                      {TermworkNavigation.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as={NavLink}
                          to={item.href}
                          className="block px-8 py-2 text-xs text-white hover:bg-gray-600 hover:text-white"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel> */}
                  </Disclosure>
                  <Disclosure as="div" className="relative">
                    <DisclosureButton className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      Curriculum
                    </DisclosureButton>
                    <DisclosurePanel className="space-y-1">
                      {formCurriculum.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as={NavLink}
                          to={item.href}
                          className="block px-8 py-2 text-xs text-white hover:bg-gray-600 hover:text-white">
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                  <Disclosure as="div" className="relative">
                    <DisclosureButton className="block px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                      Results
                    </DisclosureButton>
                    <DisclosurePanel className="space-y-1">
                      {resultNavigation.map((item) => (
                        <DisclosureButton
                          key={item.name}
                          as={NavLink}
                          to={item.href}
                          className="block px-8 py-2 text-xs text-white hover:bg-gray-600 hover:text-white"
                        >
                          {item.name}
                        </DisclosureButton>
                      ))}
                    </DisclosurePanel>
                  </Disclosure>
                </>
              )}
            </>
          )}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
