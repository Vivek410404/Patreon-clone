"use client"
import React, { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
// import { useDropzone } from 'react-dropzone';
// import { v4 as uuidv4 } from 'uuid';
import { fetchuser, updateProfile } from '@/actions/useractions';

const Dashboard = () => {

    const { data: session } = useSession();
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        ProfilePicture: "",
        CoverPicture: "",
        RazorpayID: "",
        RazorpaySecretKey: ""
    });

    useEffect(() => {
        if (!session) {
            router.push('/login');
        } else {
            getData();
        }
    }, [session, router]);

    const getData = async () => {
        if (session?.user?.name) {
            let user = await fetchuser(session.user.name);
            setForm(user);
        }
    };

    const handleChange = async(e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        let a = await updateProfile(e, session.user.name);
        console.log(a)
        alert("Profile Updated");
    };

    return (
        <div className='text-white w-1/3 flex flex-col justify-center items-center mx-auto'>
            <div className='text-3xl font-bold mt-4 mb-6'>
                Welcome To Your Dashboard
            </div>
            <form action={handleSubmit} className='w-full'>
                <div className='Name flex flex-col w-full mt-2'>
                    <label className='text-sm mb-1' htmlFor="name">Name</label>
                    <input onChange={handleChange} value={form.name} className='bg-[#4a4c63] my-0 w-full rounded-md h-8 outline-none px-2' type="text" name='name' id='name' />
                </div>
                <div className='Email flex flex-col w-full mt-2'>
                    <label className='text-sm mb-1' htmlFor="email">Email</label>
                    <input onChange={handleChange} value={form.email} className='bg-[#4a4c63] my-0 w-full rounded-md h-8 outline-none px-2' type="email" name="email" id="email" />
                </div>
                <div className='Username flex flex-col w-full mt-2'>
                    <label className='text-sm mb-1' htmlFor="username">Username</label>
                    <input onChange={handleChange} value={form.username} className='bg-[#4a4c63] my-0 w-full rounded-md h-8 outline-none px-2' type="text" name="username" id="username" />
                </div>
                <div className='Profile_Picture flex flex-col w-full mt-2'>
                    <label className='text-sm mb-1' htmlFor="Profile_Picture">Profile Picture</label>
                    <input onChange={handleChange} value={form.ProfilePicture} className='bg-[#4a4c63] my-0 w-full rounded-md h-8 outline-none px-2' type="text" name="ProfilePicture" id="Profile_Picture" />
                </div>
                <div className='Cover_Picture flex flex-col w-full mt-2'>
                    <label className='text-sm mb-1' htmlFor="CoverPicture">Cover Picture</label>
                    <input onChange={handleChange} value={form.CoverPicture} className='!bg-[#4a4c63] my-0 w-full rounded-md h-8 outline-none px-2' type="text" name="CoverPicture" id="CoverPicture" />
                </div>
                <div className='Razorpay-Id flex flex-col w-full mt-2'>
                    <label className='text-sm mb-1' htmlFor="Razorpay_id">Razorpay Id</label>
                    <input onChange={handleChange} value={form.RazorpayID} className='bg-[#4a4c63] items-center my-0 w-full rounded-md h-8 outline-none px-2' type="text" name="RazorpayID" id="Razorpay_id" />
                </div>
                <div className='Razorpay-Secret-Key flex flex-col w-full mt-2'>
                    <label className='text-sm mb-1' htmlFor="Razorpay_Secret_Key">Razorpay Secret Key</label>
                    <input onChange={handleChange} value={form.RazorpaySecretKey} className='bg-[#4a4c63] my-0 w-full rounded-md h-8 outline-none px-2' type="text" name="RazorpaySecretKey" id="Razorpay_Secret_Key" />
                </div>
                <div className='save w-full mt-3'>
                    <button type='submit' className='bg-blue-600 outline-none w-full rounded-md my-2 h-8 px-2'>Save</button>
                </div>
            </form>
        </div>
    );
}

export default Dashboard;


{/* {dropzone} */ }

// const { getRootProps: getRootProps_Profile, getInputProps: getInputProps_Profile, acceptedFiles: acceptedFiles_Profile } = useDropzone({
//     noKeyboard: true,
//     maxFiles: 1,
//     accept: {
//         'image/jpeg': [],
//         'image/png': []
//     }
// });

// const { getRootProps: getRootProps_Cover, getInputProps: getInputProps_Cover, acceptedFiles: acceptedFiles_Cover } = useDropzone({
//     noKeyboard: true,
//     maxFiles: 1,
//     accept: {
//         'image/jpeg': [],
//         'image/png': []
//     }
// });

// const Profile_Picture = acceptedFiles_Profile.length > 0 ? acceptedFiles_Profile[0] : null;
// const Cover_Picture = acceptedFiles_Cover.length > 0 ? acceptedFiles_Cover[0] : null;


{/* <div className='Profile-Picture flex flex-col w-full mt-2'>
                    <label className='text-sm mb-1' htmlFor="Profile_Picture">Profile Picture</label>
                    <section className="flex gap-2 items-center bg-[#4a4c63] px-2 h-8 rounded-md">
                        <div {...getRootProps_Profile({ className: 'dropzone' })}>
                            <input {...getInputProps_Profile()} />
                            <p>Choose File</p>
                        </div>
                        <aside className='mx-2'>
                            <span>{Profile_Picture ? Profile_Picture.name : form.ProfilePicture}</span>
                        </aside>
                    </section>
                </div>
                <div className='Cover-Picture flex flex-col w-full mt-2'>
                    <label className='text-sm mb-1' htmlFor="Cover_Picture">Cover Picture</label>
                    <section className="flex gap-2 items-center bg-[#4a4c63] px-2 h-8 rounded-md">
                        <div {...getRootProps_Cover({ className: 'dropzone' })}>
                            <input {...getInputProps_Cover()} />
                            <p>Choose File</p>
                        </div>
                        <aside className='mx-2'>
                            <span>{Cover_Picture ? Cover_Picture.name : form.CoverPicture}</span>
                        </aside>
                    </section>
                </div> */}

{/* {/Dropzone} */ }