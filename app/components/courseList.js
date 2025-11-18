"use client";

import { useRouter } from "next/navigation";

export function COS101(){
  const router = useRouter();
  function Route() {
  router.push(`/courses/cos101/quiz`);
  }
    return(
      <button className="course selector" onClick={Route}><h1>COS101</h1></button>
        
    )
  }
    
            
    
  export  const STA111 = () => {
    const router = useRouter();
     function Route() {
  router.push(`/courses/sta111/quiz`);
  }
      return <li>
        <button className="course selector" onClick={Route}><h1>STA111</h1></button>
        </li>
    }
 export   const ENT211 = () => {
  const router = useRouter();
     function Route() {
  router.push(`/courses/ent211/`);
  }
      return (
        <li>
            <button className="course selector" onClick={Route}><h1>ENT211</h1></button>
            </li>
      )
    }
  export  const IFT212 = () => {
    const router = useRouter();
     function Route() {
  router.push(`/courses/ift212/`);
  }
      return (
        <li>
            <button className="course selector" onClick={Route}><h1>IFT212</h1></button>
            </li>
      )
    }
