'use client';
import styles from '@/app/styles/button.module.css'
import Link from "next/link";
import Logo from '@/app/components/logo';
export default function Button(  ) {
  
  
    return(
       <>
       <main>
        <h3>Select Mode</h3>
        <Link href={`/asp`}><button className="course selector">Aspirant</button></Link>
        <Link href={`/b`}><button className="course selector">Student</button></Link>
       </main>
       </>
    )
}