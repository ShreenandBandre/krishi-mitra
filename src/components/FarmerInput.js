'use client';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SchemeRecommeder from './SchemeRecommender'; // Updated to import SchemeRecommeder
import styles from '../styles/FarmerInput.module.css';

const FarmerInput = () => {
    const { t, i18n } = useTranslation();
    const [formData, setFormData] = useState({
        Income: '',
        farmArea: '',
        cropType: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [filters, setFilters] = useState(null); // New state to store form data as filters

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
 
    const validate = () => {
        let errors = {};
        if (!formData.Income) {
            errors.Income = t('farmerinput.incomeRequired');
        }
        if (!formData.farmArea) {
            errors.farmArea = 'Farm area is required';
        }
        
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            setIsSubmitted(true);
            setFilters(formData); // Set form data as filters for SchemeRecommeder
        }
    };

    return (
        <div className={styles.registrationPage}>
            <div className={styles.registrationContainer}>
                <h2 className={styles.title}>{t('farmerinput.title')}</h2>
                <form className={styles.registrationForm} onSubmit={handleSubmit}>  
                    <div className={styles.formGroup}>
                        <label htmlFor="Income">{t('farmerinput.income')}</label>
                        <input
                            type="number"
                            id="Income"
                            name="Income"
                            className={styles.inputField}
                            value={formData.Income}
                            onChange={handleChange}
                            required
                        />
                        {formErrors.Income && <span className={styles.errorMessage}>{formErrors.Income}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="farmArea">{t('farmerinput.area')}</label>
                        <input
                            type="number"
                            id="farmArea"
                            name="farmArea"
                            className={styles.inputField}
                            value={formData.farmArea}
                            onChange={handleChange}
                            // requred
                        />
                        {formErrors.farmArea && <span className={styles.errorMessage}>{formErrors.farmArea}</span>}
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="cropType">{t('farmerinput.croptype')}</label>
                        <input
                            type="text"
                            id="cropType"
                            name="cropType"
                            className={styles.inputField}
                            value={formData.cropType}
                            onChange={handleChange}
                            // required
                        />
                        {formErrors.cropType && <span className={styles.errorMessage}>{formErrors.cropType}</span>}
                    </div>
                    <button type="submit" className={styles.registerButton}>{t('farmerinput.check')}</button>
                </form>
                
                {/* After form submission, open SchemeRecommeder instead of SchemeDisplay */}
                {isSubmitted && <SchemeRecommeder filters={filters} />}
            </div>
        </div>
    );
};

export default FarmerInput;
