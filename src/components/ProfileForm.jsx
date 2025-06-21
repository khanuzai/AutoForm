import React from 'react'

const ProfileForm = ({ profile, setProfile }) => {
  const handleChange = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  const fields = [
    { key: 'name', label: 'Full Name *', type: 'text', placeholder: 'John Doe' },
    { key: 'age', label: 'Age', type: 'number', placeholder: '25' },
    { key: 'email', label: 'Email', type: 'email', placeholder: 'john.doe@email.com' },
    { key: 'phone', label: 'Phone', type: 'tel', placeholder: '+1 (555) 123-4567' },
    { key: 'address', label: 'Address', type: 'textarea', placeholder: '123 Main St, City, State 12345', rows: 2 },
    { key: 'education', label: 'Education Background', type: 'textarea', placeholder: "Bachelor's in Computer Science from XYZ University, 2020", rows: 2 },
    { key: 'experience', label: 'Work Experience', type: 'textarea', placeholder: '3 years as a Software Developer at Tech Corp, specializing in React and Node.js...', rows: 3 },
    { key: 'skills', label: 'Skills & Expertise', type: 'textarea', placeholder: 'JavaScript, React, Node.js, Python, AWS, Docker, Git...', rows: 2 },
    { key: 'goals', label: 'Career Goals', type: 'textarea', placeholder: 'To become a Senior Full-Stack Developer and lead innovative projects...', rows: 2 },
    { key: 'interests', label: 'Interests & Hobbies', type: 'textarea', placeholder: 'Open source contribution, hiking, reading tech blogs, playing guitar...', rows: 2 }
  ]

  return (
    <div className="glass-card rounded-3xl p-8 hover-card">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white text-xl">👤</span>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Personal Profile</h2>
          <p className="text-gray-600 text-sm">Fill in your details for intelligent form filling</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fields.map((field, index) => (
          <div key={field.key} className={`stagger-item ${field.type === 'textarea' ? 'md:col-span-2' : ''}`}>
            <label className="block text-sm font-semibold text-gray-700 mb-3">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                value={profile[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none resize-none"
                rows={field.rows}
                placeholder={field.placeholder}
              />
            ) : (
              <input
                type={field.type}
                value={profile[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="w-full modern-input px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none"
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <span className="text-white text-xs">💡</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900 mb-1">Pro Tip</p>
            <p className="text-sm text-gray-600">The more detailed your profile, the better the AI can fill your forms! Include specific details about your experience, skills, and goals.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileForm 