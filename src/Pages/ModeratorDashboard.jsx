import React from 'react';
import ReviewQueue from './ReviewQueue';
import ReportedContent from './ReportedContent';
import { useLoaderData } from 'react-router';

const ModeratorDashboard = () => {
    const products = useLoaderData();
    return (
        <div>
            <ReviewQueue products={products}></ReviewQueue>
            <ReportedContent></ReportedContent>
        </div>
    );
};

export default ModeratorDashboard;