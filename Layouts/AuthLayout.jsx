import React, { useEffect } from "react";
import { Navbar } from "../components";
import app from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  removeCurrentUser,
  setCurrentUser,
  setProfilePicture,
  setWarehouseId,
} from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LoadingPage } from "../components";
import { setLoading } from "../features/appSlice";
import { getUserInfo } from "../services/getUserInfo";
import router from "next/router";
import cookieCutter from "cookie-cutter";
import Head from "next/head";

const AuthLayout = ({ children }) => {
  const auth = getAuth(app);
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const { accessToken, uid, warehouseId } = useSelector(
    (state) => state.user.currentUser,
  );
  const loading = useSelector((state) => state.app.loading);
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      dispatch(setLoading({ loading: true }));
    });
    router.events.on("routeChangeComplete", () => {
      dispatch(setLoading({ loading: false }));
    });
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(setLoading({ loading: true }));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        cookieCutter.set("token", user.accessToken);
        cookieCutter.set("uid", user.uid);
        dispatch(
          setCurrentUser({ accessToken: user.accessToken, uid: user.uid }),
        );
      } else {
        dispatch(removeCurrentUser());
        dispatch(setLoading({ loading: false }));
      }
    });
  }, [auth, dispatch]);

  useEffect(() => {
    if (!warehouseId && uid) {
      getUserInfo(uid, accessToken).then((data) => {
        if (data && data.profileImage) {
          dispatch(setProfilePicture(data.profileImage));
        }
        if (!!data.warehouseId) {
          dispatch(setWarehouseId({ warehouseId: data.warehouseId }));
          dispatch(setLoading({ loading: false }));
        } else {
          router.push("/register-warehouse");
        }
      });
    }
  }, [warehouseId, dispatch, uid, accessToken]);

  const handleLogout = () => {
    return signOut(auth);
  };

  return (
    <>
      <Head>
        <title>Goodang - Inventory Control</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="min-h-screen">
        <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
        {loading && <LoadingPage />}
        <div className="h-full bg-main top-16 relative ">
          {!loading && children}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
