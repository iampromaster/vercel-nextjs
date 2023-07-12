import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";

type Props = {
  initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  // ❶ useStateを使って状態を定義する
  const [catImageUrl, setCatImageUrl] = useState(initialImageUrl);
  const handleClick = async () => {
    const image = await fetchImage();
    setCatImageUrl(image.url);
  };
  return (
    <div>
      <button
        onClick={handleClick}
        style={{
          backgroundColor: "#319795",
          border: "none",
          borderRadius: "4px",
          color: "white",
          padding: "4px 8px",
        }}>
        きょうのにゃんこ🐱
      </button>
      <div style={{ marginTop: 8, maxWidth: 500 }}>
        <img src={catImageUrl} width="100%" height="auto" alt="猫" />
      </div>
    </div>
  );
};
export default IndexPage;

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();
  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

type Image = {
  url: string;
};
const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};
