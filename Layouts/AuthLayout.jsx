import React, { useEffect } from "react";
import { Navbar } from "../components";
import app from "../firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import {
  removeCurrentUser,
  setCurrentUser,
  setWarehouseId,
} from "../features/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { LoadingPage } from "../components";
import { setLoading } from "../features/appSlice";
import { getWarehouseId } from "../services/getWarehouseId";
import router from "next/router";

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
  }, [dispatch]);
  useEffect(() => {
    dispatch(setLoading({ loading: true }));
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setCurrentUser({ accessToken: user.accessToken, uid: user.uid }),
        );
        dispatch(setLoading({ loading: false }));
      } else {
        dispatch(removeCurrentUser());
        dispatch(setLoading({ loading: false }));
      }
    });
  }, [auth, dispatch]);

  useEffect(() => {
    if (!warehouseId && uid) {
      getWarehouseId(uid, accessToken).then((id) => {
        console.log("here");
        if (!!id) {
          dispatch(setWarehouseId({ warehouseId: id }));
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
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      {loading && <LoadingPage />}
      <div className=" bg-main ">{!loading && children}</div>
    </>
  );
};

export default AuthLayout;
