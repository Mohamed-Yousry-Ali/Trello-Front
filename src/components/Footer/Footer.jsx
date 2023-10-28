import React from 'react'
import style from './Footer.module.css'
export default function Footer() {
  return (
    <footer className={`${style.foot} text-white text-center fixed-bottom `}>
    <h2 className={`${style.words}`}>copyright 2023- @ITI Minya</h2>
  </footer>

  )
}
