import React from 'react'

const ProfileForm = ({ profile, setProfile }) => {
  const handleChange = (field, value) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <div className="glass-card rounded-3xl p-8 hover-card">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">👤</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Personal Profile
          </h2>
          <p className="text-gray-600 text-sm">
            Fill in your details for intelligent form filling
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="stagger-item">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Full Name *
          </label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
            placeholder="John Doe"
          />
        </div>

        <div className="stagger-item">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Age
          </label>
          <input
            type="number"
            value={profile.age}
            onChange={(e) => handleChange('age', e.target.value)}
            className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
            placeholder="25"
          />
        </div>

        <div className="stagger-item">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Email
          </label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
            placeholder="john.doe@email.com"
          />
        </div>

        <div className="stagger-item">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Phone
          </label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
            placeholder="+1 (555) 123-4567"
          />
        </div>

        <div className="md:col-span-2 stagger-item">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Address
          </label>
          <textarea
            value={profile.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none resize-none"
            rows="2"
            placeholder="123 Main St, City, State 12345"
          />
        </div>

        <div className="md:col-span-2 stagger-item">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Education Background
          </label>
          <textarea
            value={profile.education}
            onChange={(e) => handleChange('education', e.target.value)}
            className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none resize-none"
            rows="2"
            placeholder="Bachelor's in Computer Science from XYZ University, 2020"
          />
        </div>

        <div className="md:col-span-2 stagger-item">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Work Experience
          </label>
          <textarea
            value={profile.experience}
            onChange={(e) => handleChange('experience', e.target.value)}
            className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none resize-none"
            rows="3"
            placeholder="3 years as a Software Developer at Tech Corp, specializing in React and Node.js..."
          />
        </div>

        <div className="md:col-span-2 stagger-item">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Skills & Expertise
          </label>
          <textarea
            value={profile.skills}
            onChange={(e) => handleChange('skills', e.target.value)}
            className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none resize-none"
            rows="2"
            placeholder="JavaScript, React, Node.js, Python, AWS, Docker, Git..."
          />
        </div>

        <div className="md:col-span-2 stagger-item">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Career Goals
          </label>
          <textarea
            value={profile.goals}
            onChange={(e) => handleChange('goals', e.target.value)}
            className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none resize-none"
            rows="2"
            placeholder="To become a Senior Full-Stack Developer and lead innovative projects..."
          />
        </div>

        <div className="md:col-span-2 stagger-item">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Interests & Hobbies
          </label>
          <textarea
            value={profile.interests}
            onChange={(e) => handleChange('interests', e.target.value)}
            className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none resize-none"
            rows="2"
            placeholder="Open source contribution, hiking, reading tech blogs, playing guitar..."
          />
        </div>
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">💡</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 mb-1">
              Pro Tip
            </p>
            <p className="text-sm text-gray-600">
              The more detailed your profile, the better the AI can fill your forms! Include specific details about your experience, skills, and goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm 