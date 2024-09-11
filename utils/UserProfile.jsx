import React from 'react';

const UserProfile = () => {
    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">CodingProfile</h1>
                <button className="bg-black text-white px-4 py-2 rounded">Edit Profile</button>
            </div>
            <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <i className="fas fa-user text-3xl text-gray-500"></i>
                </div>
                <div className="ml-4">
                    <h2 className="text-xl font-semibold">Jane Doe</h2>
                    <div className="flex space-x-2 mt-1">
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">Python</span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">JavaScript</span>
                        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded">React</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <div className="flex items-center mb-2">
                        <i className="fas fa-id-badge text-gray-500 mr-2"></i>
                        <span className="text-gray-700">PRN: PRN12345678</span>
                    </div>
                    <div className="flex items-center">
                        <i className="fas fa-id-card text-gray-500 mr-2"></i>
                        <span className="text-gray-700">Roll No: CS2023001</span>
                    </div>
                </div>
                <div>
                    <div className="flex items-center mb-2">
                        <i className="fas fa-envelope text-gray-500 mr-2"></i>
                        <span className="text-gray-700">jane.doe@example.com</span>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Coding Stats</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span>Problems Solved</span>
                        <span>324 / 1000</span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-2 mb-4">
                        <div className="bg-black h-2 rounded-full" style={{ width: '32.4%' }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <span className="block text-2xl font-semibold">324</span>
                            <span className="text-gray-600">Problems Solved</span>
                        </div>
                        <div className="text-center">
                            <span className="block text-2xl font-semibold">15</span>
                            <span className="text-gray-600">Contests Participated</span>
                        </div>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                    <ul className="list-disc list-inside space-y-2">
                        <li>Solved 'Two Sum' problem in Python</li>
                        <li>Participated in Weekly Contest 305</li>
                        <li>Achieved 30 days coding streak</li>
                        <li>Solved 'Reverse Linked List' problem in JavaScript</li>
                        <li>Earned 'Algorithm Specialist' badge</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
