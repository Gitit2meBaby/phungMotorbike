'use client'
import React from 'react'

const RepairLinkText = () => {
    return (
        <>
            <p>If you have a special request, it is better to contact us via <a aria-label='Facebook link' style={{ textDecoration: 'none' }} href="https://www.facebook.com/PhungMotorbike?ref=embed_page" target="_blank" rel="noopener noreferrer">Facebook</a> or <span onClick={() => window.open('https://wa.me/84904253491')}>Whatsapp (+84 904 2534 91)</span> before you come. Some complicated work can only be done at our warehouse at <span aria-label='Open address in Google Maps' onClick={() => window.open('https://maps.google.com?q=13%20Ngo%20Huyen,%20Hang%20Trong,%20Hoan%20Kiem,%20Ha%20Noi', '_blank')}>99 Bac Cau street, Long Bien.</span></p></>
    )
}

export default RepairLinkText