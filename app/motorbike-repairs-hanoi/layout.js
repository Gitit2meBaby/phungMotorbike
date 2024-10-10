export const metadata = {
    title: "Motorbike Repair Service in Hanoi | Phung Motorbike",
    description:
        "Professional motorbike repair services in Hanoi. Phung Motorbike offers oil changes, tyre repairs, engine diagnostics, and more. Contact us for a free consultation.",
    canonical: "https://phungmotorbike.com/motorbike-repairs-hanoi",
    keywords:
        "motorbike repair, motorbike service, Hanoi motorbike repair, oil change, tyre repair, engine diagnostics, bike repair Hanoi",

    openGraph: {
        type: "website",
        title: "Motorbike Repair Service in Hanoi | Phung Motorbike",
        description:
            "Get reliable motorbike repairs at Phung Motorbike in Hanoi. We offer oil changes, tyre repairs, engine diagnostics, brake service, and more. Free consultation available!",
        url: "https://phungmotorbike.com/motorbike-repairs-hanoi",
        site_name: "Phung Motorbike",
        //   images: [
        //     {
        //       url: "https://phungmotorbike.com/images/motorbike-repair-service.jpg", // Replace with the actual image path
        //       width: 1200,
        //       height: 630,
        //       alt: "Motorbike Repair Service in Hanoi",
        //     },
        //   ],
    },
};


const RepairPageLayout = ({ children }) => {
    return (
        <>
            {children}
        </>
    );
};

export default RepairPageLayout;
