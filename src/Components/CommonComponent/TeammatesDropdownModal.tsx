
'use client';
// Accordion.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/loader.module.scss';

interface AccordionProps {
    title: string;
    children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen((prevIsOpen) => !prevIsOpen);
    };

    return (
        <div className="accordion">
            <div className="accordion-header" onClick={toggleAccordion}>
                <span className={`accordion-icon ${isOpen ? 'open' : 'closed'}`}></span>
                <h2>{title}</h2>
                <Image src="../assests/teammatedropdown.svg" alt="Tg-logo" width={20} height={20} />
            </div>
            {isOpen && <div className="accordion-content">
                <table className={styles.table}>
                    <tr className={styles.tablerow}>
                        <th className={styles.text}>Name</th>
                        <th className={styles.text}>Email Id</th>
                        <th className={styles.text}>Username</th>
                    </tr>
                    <tr className={styles.tablerow}>
                        <td className={styles.text}>Jaspreet Singh</td>
                        <td className={styles.text}>Jassi@gmail.com</td>
                        <td className={styles.text}>Jassi</td>
                    </tr>
                    <tr className={styles.tablerow}>
                        <td className={styles.text}>Jaspreet Singh</td>
                        <td className={styles.text}>Jassi@gmail.com</td>
                        <td className={styles.text}>Jassi</td>
                    </tr>
                    <tr className={styles.tablerow}>
                        <td className={styles.text}>Jaspreet Singh</td>
                        <td className={styles.text}>Jassi@gmail.com</td>
                        <td className={styles.text}>Jassi</td>
                    </tr>
                    <tr className={styles.tablerow}>
                        <td className={styles.text}>Jaspreet Singh</td>
                        <td className={styles.text}>Jassi@gmail.com</td>
                        <td className={styles.text}>Jassi</td>
                    </tr>

                </table></div>}
        </div>
    );
};

export default Accordion;
