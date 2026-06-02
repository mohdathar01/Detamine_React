
import logo from "/images/logo.png";
import { useEffect, useState } from "react";
import { useWeb3 } from "../../context/Web3Context";



const Header = ({ userId: userIdProp }) => {
  const { account, contract } = useWeb3();
  const [userId, setUserId] = useState(userIdProp || "");

  useEffect(() => {
    if (userIdProp) {
      setUserId(userIdProp);
      return;
    }

    const fetchUserId = async () => {
      if (!account || !contract) {
        setUserId("");
        return;
      }

      try {
        const id = Number(await contract.ids(account));
        setUserId(id || "");
      } catch (err) {
        console.error("Header user id error:", err);
      }
    };

    fetchUserId();
  }, [account, contract, userIdProp]);




  return (
    <div style={styles.header}>
      <div style={styles.wrapper}>
         
        {/* LOGO */}
        <div>
          <img src={logo} width="120" alt="logo" />
        </div>

        {userId ? <span className="user-id">ID: {userId}</span> : null}
      </div>
    </div>
  );
};

const styles = {
  header: {
        background: 'rgb(0 0 0 / 79%)',
    padding: ' 8px 12px',
    position: 'relative',
  },
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  langContainer: {
    position: "relative",
    cursor: "pointer",
    color: "#fff",
  },
  selected: {
    display: "flex",
    alignItems: "center",
  },
  dropdown: {
    position: "absolute",
    right: 0,
    top: "40px",
    background: "#1a1625",
    borderRadius: "6px",
    padding: "10px",
    minWidth: "150px",
    zIndex: 999,
  },
  option: {
    display: "flex",
    alignItems: "center",
    padding: "6px 0",
    cursor: "pointer",
  },
};

export default Header;
