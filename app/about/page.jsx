'use client'

import { 
  Target, 
  Eye, 
  Heart, 
  Users, 
  Award, 
  TrendingUp,
  Database,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  Linkedin,
  Twitter,
  Mail
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function AboutPage() {
  const stats = [
    { icon: Database, label: 'Datasets', value: '1000+' },
    { icon: Users, label: 'Active Users', value: '50K+' },
    { icon: TrendingUp, label: 'Data Points', value: '500M+' },
    { icon: Award, label: 'Partners', value: '25+' }
  ]

  const values = [
    {
      icon: Shield,
      title: 'Data Integrity',
      description: 'We ensure all data comes from verified, authoritative sources with rigorous quality checks.'
    },
    {
      icon: Globe,
      title: 'Open Access',
      description: 'Making data freely accessible to researchers, policymakers, and citizens for informed decisions.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'Leveraging cutting-edge technology to visualize and analyze data in meaningful ways.'
    },
    {
      icon: Heart,
      title: 'Social Impact',
      description: 'Committed to using data as a force for positive change in Bangladesh and beyond.'
    }
  ]

  const team = [
    {
      name: 'Dr. Ahmed Rahman',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
      bio: 'PhD in Data Science with 15+ years of experience in analytics and policy research.',
      linkedin: '#',
      twitter: '#',
      email: 'ahmed@dataplatform.bd'
    },
    {
      name: 'Sarah Khan',
      role: 'Chief Data Officer',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
      bio: 'Former World Bank data analyst specializing in development economics.',
      linkedin: '#',
      twitter: '#',
      email: 'sarah@dataplatform.bd'
    },
    {
      name: 'Imran Hossain',
      role: 'Head of Technology',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
      bio: 'Tech leader with expertise in building scalable data infrastructure.',
      linkedin: '#',
      twitter: '#',
      email: 'imran@dataplatform.bd'
    },
    {
      name: 'Nadia Ahmed',
      role: 'Lead Data Scientist',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
      bio: 'AI/ML expert focused on predictive analytics and data visualization.',
      linkedin: '#',
      twitter: '#',
      email: 'nadia@dataplatform.bd'
    }
  ]

  const milestones = [
    { year: '2020', title: 'Platform Launch', description: 'Launched with 50 datasets from 5 government sources' },
    { year: '2021', title: 'API Release', description: 'Opened public API for developers and researchers' },
    { year: '2022', title: 'Mobile App', description: 'Released mobile applications for iOS and Android' },
    { year: '2023', title: 'AI Integration', description: 'Integrated AI-powered analytics and predictions' },
    { year: '2024', title: 'Regional Expansion', description: 'Expanded to cover South Asian region data' },
    { year: '2025', title: '1000+ Datasets', description: 'Reached milestone of 1000+ curated datasets' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0d1428] to-[#0a0e1a] pt-20">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="gradient-text">Our Platform</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
            Empowering Bangladesh through open data, transparent insights, and evidence-based decision making
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div key={index} className="bg-[#1a2332] border border-[#00d4ff]/20 rounded-xl p-6 text-center">
                <Icon className="text-[#00d4ff] mx-auto mb-3" size={32} />
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-[#0d1428] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-xl flex items-center justify-center mb-6">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
              <p className="text-gray-400 leading-relaxed">
                To democratize access to Bangladesh's data, making it freely available, easily understandable, and actionable for everyone. We believe that transparency and open data are fundamental to building a prosperous, equitable society.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-2xl p-8">
              <div className="w-16 h-16 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-xl flex items-center justify-center mb-6">
                <Eye className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Our Vision</h2>
              <p className="text-gray-400 leading-relaxed">
                To become South Asia's leading open data platform, driving evidence-based policy making and fostering innovation through accessible, high-quality data that empowers citizens, researchers, and decision-makers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Core <span className="gradient-text">Values</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The principles that guide everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 hover:border-[#00d4ff]/30 transition-all">
                <div className="w-12 h-12 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-lg flex items-center justify-center mb-4">
                  <Icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-[#0d1428] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Key milestones in our mission to transform data accessibility
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#00d4ff] to-[#0066ff] hidden md:block"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 inline-block">
                      <div className="text-[#00d4ff] font-bold text-sm mb-2">{milestone.year}</div>
                      <h3 className="text-xl font-bold text-white mb-2">{milestone.title}</h3>
                      <p className="text-gray-400 text-sm">{milestone.description}</p>
                    </div>
                  </div>

                  {/* Timeline Dot */}
                  <div className="w-4 h-4 bg-gradient-to-br from-[#00d4ff] to-[#0066ff] rounded-full border-4 border-[#0d1428] flex-shrink-0 hidden md:block"></div>

                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate experts dedicated to data transparency and social impact
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, index) => (
            <div key={index} className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl overflow-hidden hover:border-[#00d4ff]/30 transition-all group">
              <div className="h-64 relative bg-[#0d1428]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                <p className="text-[#00d4ff] text-sm mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{member.bio}</p>
                
                <div className="flex gap-3">
                  <a href={member.linkedin} className="p-2 bg-[#0d1428] rounded-lg hover:bg-[#00d4ff]/10 transition-colors">
                    <Linkedin size={18} className="text-[#00d4ff]" />
                  </a>
                  <a href={member.twitter} className="p-2 bg-[#0d1428] rounded-lg hover:bg-[#00d4ff]/10 transition-colors">
                    <Twitter size={18} className="text-[#00d4ff]" />
                  </a>
                  <a href={`mailto:${member.email}`} className="p-2 bg-[#0d1428] rounded-lg hover:bg-[#00d4ff]/10 transition-colors">
                    <Mail size={18} className="text-[#00d4ff]" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-[#0d1428] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="gradient-text">Partners</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Collaborating with leading organizations to ensure data quality and accessibility
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Bangladesh Bureau of Statistics',
              'Bangladesh Bank',
              'Ministry of Health',
              'Directorate of Education',
              'Local Government Division',
              'Planning Commission',
              'World Bank',
              'UNDP Bangladesh'
            ].map((partner, index) => (
              <div key={index} className="bg-[#1a2332] border border-[#00d4ff]/10 rounded-xl p-6 flex items-center justify-center text-center hover:border-[#00d4ff]/30 transition-all">
                <div className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-green-400 flex-shrink-0" />
                  <span className="text-white text-sm font-medium">{partner}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-[#1a2332] to-[#0d1428] border border-[#00d4ff]/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Join Us in Our <span className="gradient-text">Mission</span>
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Whether you're a data provider, researcher, or simply passionate about transparency, there are many ways to contribute to our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <button className="px-8 py-3 bg-gradient-to-r from-[#00d4ff] to-[#0066ff] text-white rounded-lg font-semibold hover:scale-105 transition-transform">
                Get In Touch
              </button>
            </Link>
            <Link href="/datasets">
              <button className="px-8 py-3 bg-[#1a2332] border border-[#00d4ff]/20 text-white rounded-lg hover:bg-[#1f2937] transition-colors">
                Explore Datasets
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .gradient-text {
          background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>
    </div>
  )
}