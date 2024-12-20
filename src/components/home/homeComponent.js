import React from 'react';

const Home = () => {
  return (
    <div  style={styles.container}>
      <p>Olá, seja bem-vindo</p>
    </div>
  );
};


const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(-45deg, #2F4F4F, #696969, #808080, #D3D3D3)",
      animation: "gradient 6s ease infinite",
      backgroundSize: "400% 400%",
    },
};

export default Home;
