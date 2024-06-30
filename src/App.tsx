import React from "react";
import { Layout } from "antd";
import EarthHistory from "./EarthHistory.tsx";
import "antd/dist/reset.css"; // Import Ant Design styles
import "./App.css"; // Custom styles if needed

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
  return (
    <Layout>
      <Header>
        <h1>Earth's History in 24 Hours</h1>
      </Header>
      <Content style={{ padding: "2rem" }}>
        <EarthHistory />
      </Content>
      <Footer style={{ textAlign: "center" }}>
        <p>
          Created by Mohamed El Aammari - Inspired by the Camino de Santiago
          journey
        </p>
      </Footer>
    </Layout>
  );
};

export default App;
