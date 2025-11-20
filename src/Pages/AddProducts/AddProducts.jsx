import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import { WithContext as ReactTags } from 'react-tag-input';
import axiosPublic from '../../Axios/AxiosPublic';
import { useNavigate } from 'react-router';

const AddProducts = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user } = useAuth();
    const [tags, setTags] = useState([]);
    const navigate = useNavigate();

    const onSubmit = async (data) => {

        const formData = { ...data, votes:0, tags: tags.map(tag => tag.text), timestamp: new Date() };

        try {
            const response = await axiosPublic.post('/products', formData); // Requesting to post in server and saving the response here

            if (response.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product Submitted!',
                    text: 'Your product has been successfully submitted.',
                });
                navigate('/myProducts')
            }
        }
        catch (error) {
            console.log(error);
        }

        // axiosPublic.post('/products', formData)
        //     .then(res => {
        //         if (res.data.insertedId) {
        //             Swal.fire({
        //                 icon: 'success',
        //                 title: 'Product Submitted!',
        //                 text: 'Your product has been successfully submitted.',
        //             });
        //             navigate('/myProducts')
        //         }
        //     })
        //     .catch(err => {
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Oops!',
        //             text: 'Something went wrong!',
        //         });
        //     })
    };

    const handleDeleteTag = (i) => { // i is automatic index of tag to be deleted
        setTags(tags.filter((tag) => tag !== tags[i]));
    }

    const handleAddition = (tag) => { // function automatically receives the new tag object that the user just typed
        setTags([...tags, tag]);
    }
    return (
        <div className="max-w-lg mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Add Product</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Product Name */}
                <div>
                    <label className="label">
                        <span className="label-text">Product Name</span>
                    </label>
                    <input
                        type="text"
                        {...register('productName', { required: 'Product Name is required' })}
                        placeholder="Enter product name"
                        className="input input-bordered w-full"
                    />
                    {errors.productName && <p className="text-red-600">{errors.productName.message}</p>}
                </div>

                {/* Product Image URL */}
                <div>
                    <label className="label">
                        <span className="label-text">Product Image URL</span>
                    </label>
                    <input
                        type="url"
                        {...register('productImage', { required: 'Product Image URL is required' })}
                        placeholder="Enter image URL"
                        className="input input-bordered w-full"
                    />
                    {errors.productImage && <p className="text-red-600">{errors.productImage.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="label">
                        <span className="label-text">Description</span>
                    </label>
                    <textarea
                        {...register('description', { required: 'Description is required' })}
                        placeholder="Enter product description"
                        className="textarea textarea-bordered w-full"
                    />
                    {errors.description && <p className="text-red-600">{errors.description.message}</p>}
                </div>

                {/* Product Owner Name */}
                <div>
                    <label className="label">
                        <span className="label-text">Product Owner Name</span>
                    </label>
                    <input
                        type="text"
                        defaultValue={user?.displayName}
                        readOnly
                        {...register('ownerName', { required: 'Owner Name is required' })}
                        placeholder="Enter owner name"
                        className="input input-bordered w-full"
                    />
                    {errors.ownerName && <p className="text-red-600">{errors.ownerName.message}</p>}
                </div>
                {/* Product Owner Image */}
                <div>
                    <label className="label">
                        <span className="label-text">Product Owner Image</span>
                    </label>
                    <input
                        type="url"
                        defaultValue={user?.photoURL}
                        readOnly
                        {...register('ownerImage', { required: 'Owner Name is required' })}
                        placeholder="Enter owner name"
                        className="input input-bordered w-full"
                    />
                    {errors.ownerImage && <p className="text-red-600">{errors.ownerImage.message}</p>}
                </div>
                {/* Product Owner Email */}
                <div>
                    <label className="label">
                        <span className="label-text">Product Owner Email</span>
                    </label>
                    <input
                        type="email"
                        defaultValue={user?.email}
                        readOnly
                        {...register('ownerEmail', { required: 'Owner Name is required' })}
                        placeholder="Enter owner name"
                        className="input input-bordered w-full"
                    />
                    {errors.ownerEmail && <p className="text-red-600">{errors.ownerEmail.message}</p>}
                </div>

                {/* Tags */}
                <div>
                    <label className="label">
                        <span className="label-text">Tags</span>
                    </label>
                    <ReactTags
                        tags={tags}
                        handleDelete={handleDeleteTag}
                        handleAddition={handleAddition}
                        inputFieldPosition="bottom"
                        autocomplete
                    />
                </div>

                {/* External Links */}
                <div>
                    <label className="label">
                        <span className="label-text">External Links</span>
                    </label>
                    <input
                        type="url"
                        {...register('externalLinks', { required: 'External link is required' })}
                        placeholder="Enter external link"
                        className="input input-bordered w-full"
                    />
                    {errors.externalLinks && <p className="text-red-600">{errors.externalLinks.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-full mt-4">
                    Submit Product
                </button>

            </form>
        </div>
    );
};

export default AddProducts;