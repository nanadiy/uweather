import SiteConfig from "@/components/SiteConfig";

// Updated `global.cdn` to handle edge cases.
global.cdn = (url: string) => {
  if (url && url.startsWith("/files")) {
    return SiteConfig.sitefiles + url.replace(/\/files\//, "/");
  } else {
    return url || ""; // Return empty string if url is undefined
  }
};

// Updated `global.api` to handle error cases gracefully.
global.api = async (url: string, data?: any): Promise<any> => {
  try {
    const response = data
      ? await fetch(url, { method: "POST", body: JSON.stringify(data) })
      : await fetch(url);
    if (!response.ok) {
      console.error(`API request failed: ${response.statusText}`);
      return { error: "Request failed", status: response.status };
    }
    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    return { error: "Network error", details: error };
  }
};

import '../styles/globals.css';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from "react";
import dynamic from 'next/dynamic';

const Prompt = dynamic(() => import("../components/Parent/Prompt.tsx").then(x => x.default), { suspense: false, ssr: false });
const QELoader = dynamic(() => import("../components/Parent/QELoader.tsx").then(x => x.default), { suspense: false, ssr: false });

import QSON from '../components/Parent/QSON';
import Scroller from '../components/Parent/Scroller';
import Router from "next/router";

QSON();
Scroller();

export default function App({ Component, pageProps }) {
  let sessionreloader: any = {};

  global.styles = styles;

  // Re-assign `global.cdn` to avoid duplication
  global.cdn = (url: string) => {
    if (url && url.startsWith("/files")) {
      return SiteConfig.sitefiles + url.replace(/\/files\//, "/");
    } else {
      return url || ""; // Return empty string if url is undefined
    }
  };

  // Re-assign `global.api` to avoid duplication and handle fetch errors.
  global.api = async (url: string, data?: any): Promise<any> => {
    try {
      const response = data
        ? await fetch(url, { method: "POST", body: JSON.stringify(data) })
        : await fetch(url);
      if (!response.ok) {
        console.error(`API request failed: ${response.statusText}`);
        return { error: "Request failed", status: response.status };
      }
      return await response.json();
    } catch (error) {
      console.error("API fetch error:", error);
      return { error: "Network error", details: error };
    }
  };

  global.pageProps = pageProps;
  global.reloadsession = () => {
    console.log("reloading session...");
    global.winscrollers = {};
    global.onunloader?.();
    sessionreloader?.run?.();
  };

  global.reload = () => {
    global.noloading = true;
    Router.push(window.location.href);
    global.reloadsession();
    console.log("RELOADING...");
  };

  if (!(process?.env?.NODE_ENV) && typeof global.ObjectId == "undefined") {
    global.ObjectId = class {
      toString() {
        let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
        return (
          timestamp +
          'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16))
        );
      }
    };
  }

  useEffect(() => {
    if (typeof global.ObjectId == "undefined") {
      global.ObjectId = class {
        toString() {
          let timestamp = (new Date().getTime() / 1000 | 0).toString(16);
          return (
            timestamp +
            'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => (Math.random() * 16 | 0).toString(16))
          );
        }
      };
    }

    if (!global.Declared) {
      global.Declared = true;
      import('../components/Parent/Progress.ts').then(x => x.Runner()).catch(e => console.error("Progress import failed:", e));
      import('../components/Parent/Declarations.ts').then(x => x.Runner()).catch(e => console.error("Declarations import failed:", e));
    }

    global.parentdiv = document.getElementById("wind");
    if (global.parentdiv) {
      global.parentdiv.onscroll = (e) => {
        let target: any = e.currentTarget;
        Object.values<any>(global.winscrollers).forEach(f => f?.(target.scrollHeight, target.scrollTop));

        if (!global.gototop && target.scrollTop > 1000) {
          global.gototop = true;
          document.getElementById("gototop")?.style.setProperty("display", "block");
        } else if (global.gototop && target.scrollTop < 200) {
          global.gototop = false;
          document.getElementById("gototop")?.style.setProperty("display", "none");
        }
      };
    }

    if (typeof window !== "undefined" && global.lang) {
      document.getElementById("wind")?.style.setProperty("fontFamily", "vr", "important");
    }
  });

  global.sss = (arg1, arg2) => arg2 ? console.log(arg1, arg2) : console.log(arg1);

  global.Round = (number: number, digits: number) => {
    if (typeof number !== "number" || typeof digits !== "number") {
      console.error("Invalid inputs to Round function");
      return number;
    }

    if (digits >= 0) {
      return Math.round(number * Math.pow(10, digits)) / Math.pow(10, digits);
    }

    const factor = Math.pow(10, -digits);
    const rounded = Math.round(number / factor) * factor;

    return digits === -1 ? Math.floor(rounded) : Math.floor(rounded / 10) * 10;
  };

  return (
    <div id="wind" style={{ overflowY: "auto", height: "100vh", direction: global.lang?.dir || "rtl", fontFamily: "vr" }}>
      <Prompt />
      <Component {...pageProps} />
      <QELoader />
    </div>
  );
}
