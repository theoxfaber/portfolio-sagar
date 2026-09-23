"use client";

import dynamic from "next/dynamic";

const ShaderBackdrop = dynamic(() => import("./ShaderBackdrop"), { ssr: false });

/** Client boundary so the WebGL backdrop can opt out of SSR. */
export default function ShaderMount() {
  return <ShaderBackdrop />;
}
