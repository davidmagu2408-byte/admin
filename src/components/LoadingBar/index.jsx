const LoadingBar = () => {
  return (
    <div
      className="loadingBar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "2px",
        background: "transparent",
        zIndex: 2147483647,
        width: "100%",
      }}
    >
      <div
        className="topLoadingBar"
        style={{
          height: "100%",
          background: "rgb(241, 25, 70)",
          width: "0%",
          opacity: 1,
          color: "rgb(241, 25, 70)",
        }}
      >
        <div
          className=""
          style={{
            boxShadow:
              "rgb(241, 25, 70) 0px 0px 10px, rgb(241, 25, 70) 0px 0px 5px",
            width: "5%",
            opacity: 1,
            position: "absolute",
            height: "100%",
            transform: "rotate(3deg) translate(0px, -4px)",
            left: "-5.5%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default LoadingBar;
