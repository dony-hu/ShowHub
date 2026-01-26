import React from 'react';
import './PartnersPage.css';

interface Partner {
  name: string;
  nameEn?: string;
  description: string;
  website: string;
  industry: string;
  color: string;
}

const PartnersPage: React.FC = () => {
  const technicalPartners: Partner[] = [
    {
      name: '园测信息科技',
      nameEn: 'Dpark',
      description: '地理信息系统（GIS）、测绘与空间数据服务',
      website: 'http://www.dpark.com.cn/',
      industry: '空间数据服务',
      color: '#667eea'
    },
    {
      name: '其域创新',
      nameEn: 'XGRIDS',
      description: '三维空间智能技术与三维建模服务',
      website: 'https://xgrids.cn/',
      industry: '三维建模',
      color: '#764ba2'
    },
    {
      name: '白犀牛',
      nameEn: 'RINO.AI',
      description: '人工智能视觉技术与三维内容平台',
      website: 'https://cn.rino.ai/',
      industry: 'AI视觉技术',
      color: '#f093fb'
    },
    {
      name: '海致',
      nameEn: 'Haizhi',
      description: '大数据与自然语言处理技术服务',
      website: 'https://www.haizhi.com/about',
      industry: 'NLP与大数据',
      color: '#4facfe'
    },
    {
      name: '及刻',
      nameEn: 'ISJike',
      description: '数字内容与智能技术服务解决方案',
      website: 'https://www.isjike.com/',
      industry: '数字内容服务',
      color: '#43e97b'
    },
    {
      name: '大势智慧',
      nameEn: 'Daspatial',
      description: '地理空间智能与空间数据分析平台',
      website: 'https://www.daspatial.com/',
      industry: '空间智能分析',
      color: '#fa709a'
    },
    {
      name: '宽凳',
      nameEn: 'Kuandeng',
      description: '智慧数据服务与软件开发解决方案',
      website: 'http://www.kuandeng.com/html/1/index.html',
      industry: '软件开发服务',
      color: '#fee140'
    },
    {
      name: '影石科技',
      nameEn: 'Insta360',
      description: '全景影像硬件与虚拟现实摄像技术',
      website: 'https://www.insta360.com/cn/',
      industry: '全景影像技术',
      color: '#30cfd0'
    },
    {
      name: '知天下AI',
      nameEn: 'Explorer Global 3D',
      description: '人工智能与三维空间分析技术平台',
      website: 'https://3d.explorerglobal.cn/',
      industry: '三维空间分析',
      color: '#a8edea'
    },
    {
      name: '留行科技',
      nameEn: 'Manifold Tech',
      description: '智能空间感知与三维重建技术',
      website: 'https://www.manifoldtech.cn/',
      industry: '三维重建',
      color: '#ff6a88'
    },
    {
      name: 'Waldek Technologies',
      nameEn: '',
      description: '4D时空智能平台与AI相关软件',
      website: '#',
      industry: '时空智能',
      color: '#c471f5'
    },
    {
      name: '推行科技',
      nameEn: 'Infermove',
      description: '推理与推行相关的智能技术方案',
      website: 'https://infermove.cn/',
      industry: '推理技术',
      color: '#fad961'
    }
  ];

  const academicPartners: Partner[] = [
    {
      name: '清华大学深圳研究院',
      nameEn: 'Tsinghua University',
      description: '专业从事高科技研发及其产业化',
      website: 'https://www.tsinghua.edu.cn/',
      industry: '研究机构',
      color: '#6a11cb'
    },
    {
      name: '北京交通大学计算机学院',
      nameEn: 'BJTU',
      description: '计算机科学与技术研究与人才培养',
      website: 'https://www.bjtu.edu.cn/',
      industry: '高等教育',
      color: '#2575fc'
    },
    {
      name: '苏州科技大学',
      nameEn: 'USTS',
      description: '工程应用型大学，致力于科技创新',
      website: 'https://www.usts.edu.cn/',
      industry: '高等教育',
      color: '#f46b45'
    }
  ];

  const dataProviders: Partner[] = [
    {
      name: '阿米华晟',
      nameEn: 'Amap',
      description: '数据科技与数字服务解决方案提供商',
      website: 'http://www.amhszg.com/',
      industry: '数据科技',
      color: '#ee0979'
    },
    {
      name: '滴滴地图',
      nameEn: 'Didi Map',
      description: '互联网地图与出行数据服务平台',
      website: 'https://map.didichuxing.com/',
      industry: '地图服务',
      color: '#ff6a00'
    },
    {
      name: '高德地图',
      nameEn: 'Amap',
      description: '国内领先的数字地图与位置服务提供商',
      website: 'https://www.amap.com/',
      industry: '地图服务',
      color: '#00c6ff'
    },
    {
      name: '前海数据',
      nameEn: 'Qianhai Data',
      description: '大数据管理与分析服务平台',
      website: 'http://www.qhdata.cn/',
      industry: '数据分析',
      color: '#0072ff'
    }
  ];


  return (
    <div className="partners-page">
      <section className="partners-hero">
        <div className="partners-hero-content">
          <h1>合作伙伴</h1>
          <p className="partners-subtitle">
            携手共建空间智能生态
          </p>
        </div>
      </section>

      <section className="partners-section">
        <div className="partners-container">
          <div className="partners-category">
            <h2 className="category-title">
              <span className="category-icon">🚀</span>
              技术合作伙伴
            </h2>
            <p className="category-description">
              共同推进空间智能技术创新与标准制定
            </p>
            <div className="partners-grid">
              {technicalPartners.map((partner, index) => (
                <div key={index} className="partner-card">
                  <div 
                    className="partner-color-block"
                    style={{ background: `linear-gradient(135deg, ${partner.color}, ${partner.color}dd)` }}
                  >
                    <div className="partner-name-block">
                      <h3>{partner.name}</h3>
                      {partner.nameEn && <span className="name-en">{partner.nameEn}</span>}
                    </div>
                  </div>
                  <div className="partner-info">
                    <span className="partner-industry">{partner.industry}</span>
                    <p className="partner-description">{partner.description}</p>
                    {partner.website !== '#' && (
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="partner-link"
                      >
                        访问官网 →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="partners-category">
            <h2 className="category-title">
              <span className="category-icon">📊</span>
              数据供应商
            </h2>
            <p className="category-description">
              提供高质量的空间数据与行业应用场景支持
            </p>
            <div className="partners-grid">
              {dataProviders.map((provider, index) => (
                <div key={index} className="partner-card">
                  <div 
                    className="partner-color-block"
                    style={{ background: `linear-gradient(135deg, ${provider.color}, ${provider.color}dd)` }}
                  >
                    <div className="partner-name-block">
                      <h3>{provider.name}</h3>
                      {provider.nameEn && <span className="name-en">{provider.nameEn}</span>}
                    </div>
                  </div>
                  <div className="partner-info">
                    <span className="partner-industry">{provider.industry}</span>
                    <p className="partner-description">{provider.description}</p>
                    {provider.website !== '#' && (
                      <a 
                        href={provider.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="partner-link"
                      >
                        访问官网 →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="partners-category">
            <h2 className="category-title">
              <span className="category-icon">🎓</span>
              学术合作伙伴
            </h2>
            <p className="category-description">
              与高校深度合作，推进科研创新与人才培养
            </p>
            <div className="partners-grid">
              {academicPartners.map((partner, index) => (
                <div key={index} className="partner-card">
                  <div 
                    className="partner-color-block"
                    style={{ background: `linear-gradient(135deg, ${partner.color}, ${partner.color}dd)` }}
                  >
                    <div className="partner-name-block">
                      <h3>{partner.name}</h3>
                      {partner.nameEn && <span className="name-en">{partner.nameEn}</span>}
                    </div>
                  </div>
                  <div className="partner-info">
                    <span className="partner-industry">{partner.industry}</span>
                    <p className="partner-description">{partner.description}</p>
                    {partner.website !== '#' && (
                      <a 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="partner-link"
                      >
                        访问官网 →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="partners-cta">
            <h2>期待与您合作</h2>
            <p>如果您对合作感兴趣，欢迎与我们联系</p>
            <button className="cta-button">联系我们</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PartnersPage;
