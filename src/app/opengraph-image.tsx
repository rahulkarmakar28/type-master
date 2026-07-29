import { ImageResponse } from "next/og";

export const alt = "TypeMaster — Free Typing Test, Typing Tutor & Government Exam Practice";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#12161C",
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(242,166,90,0.18), transparent)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 84,
            fontWeight: 700,
            color: "#E8E6E1",
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              width: 84,
              height: 84,
              borderRadius: 18,
              background: "#F2A65A",
              color: "#12161C",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 44,
            }}
          >
            tm
          </div>
          <div style={{ display: "flex" }}>
            type<span style={{ color: "#F2A65A" }}>master</span>
          </div>
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 32,
            color: "#9AA0AC",
            fontFamily: "sans-serif",
          }}
        >
          Typing test · Learn to type · Government exam practice
        </div>
      </div>
    ),
    { ...size }
  );
}