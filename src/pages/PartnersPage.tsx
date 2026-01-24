import React from 'react';
import './PartnersPage.css';

interface Partner {
  name: string;
  logo: string;
  description: string;
  website: string;
  industry: string;
}

const PartnersPage: React.FC = () => {
  const technicalPartners: Partner[] = [
    {
      name: '园测信息科技',
      logo: 'https://www.dpark.com.cn/favicon.ico',
      description: '地理信息系统（GIS）、测绘与空间数据服务',
      website: 'http://www.dpark.com.cn/',
      industry: '空间数据服务'
    },
    {
      name: '其域创新（XGRIDS）',
      logo: 'https://xgrids.cn/favicon.ico',
      description: '三维空间智能技术与三维建模服务',
      website: 'https://xgrids.cn/',
      industry: '三维建模'
    },
    {
      name: '白犀牛（RINO.AI）',
      logo: 'https://cn.rino.ai/favicon.ico',
      description: '人工智能视觉技术与三维内容平台',
      website: 'https://cn.rino.ai/',
      industry: 'AI视觉技术'
    },
    {
      name: '海致（Haizhi）',
      logo: 'https://www.haizhi.com/favicon.ico',
      description: '大数据与自然语言处理技术服务',
      website: 'https://www.haizhi.com/about',
      industry: 'NLP与大数据'
    },
    {
      name: '及刻（ISJike）',
      logo: 'https://www.isjike.com/favicon.ico',
      description: '数字内容与智能技术服务解决方案',
      website: 'https://www.isjike.com/',
      industry: '数字内容服务'
    },
    {
      name: '大势智慧（Daspatial）',
      logo: 'https://www.daspatial.com/favicon.ico',
      description: '地理空间智能与空间数据分析平台',
      website: 'https://www.daspatial.com/',
      industry: '空间智能分析'
    },
    {
      name: '宽凳（Kuandeng）',
      logo: 'http://www.kuandeng.com/favicon.ico',
      description: '智慧数据服务与软件开发解决方案',
      website: 'http://www.kuandeng.com/html/1/index.html',
      industry: '软件开发服务'
    },
    {
      name: '影石科技（Insta360）',
      logo: 'https://www.insta360.com/favicon.ico',
      description: '全景影像硬件与虚拟现实摄像技术',
      website: 'https://www.insta360.com/cn/',
      industry: '全景影像技术'
    },
    {
      name: '知天下AI / Explorer Global 3D',
      logo: 'https://3d.explorerglobal.cn/favicon.ico',
      description: '人工智能与三维空间分析技术平台',
      website: 'https://3d.explorerglobal.cn/',
      industry: '三维空间分析'
    },
    {
      name: '留行科技（Manifold Tech）',
      logo: 'https://www.manifoldtech.cn/favicon.ico',
      description: '智能空间感知与三维重建技术',
      website: 'https://www.manifoldtech.cn/',
      industry: '三维重建'
    },
    {
      name: 'Waldek Technologies',
      logo: 'https://placeholder.com/100/667eea/ffffff?text=Waldek',
      description: '4D时空智能平台与AI相关软件',
      website: '#',
      industry: '时空智能'
    }
  ];

  const academicPartners: Partner[] = [
    {
      name: '清华大学深圳研究院',
      logo: 'https://www.tsinghua.edu.cn/favicon.ico',
      description: '专业从事高科技研发及其产业化',
      website: 'https://www.tsinghua.edu.cn/',
      industry: '研究机构'
    },
    {
      name: '北京交通大学计算机学院',
      logo: 'https://www.bjtu.edu.cn/favicon.ico',
      description: '计算机科学与技术研究与人才培养',
      website: 'https://www.bjtu.edu.cn/',
      industry: '高等教育'
    },
    {
      name: '苏州科技大学',
      logo: 'https://www.usts.edu.cn/favicon.ico',
      description: '工程应用型大学，致力于科技创新',
      website: 'https://www.usts.edu.cn/',
      industry: '高等教育'
    }
  ];

  const dataProviders: Partner[] = [
    {
      name: '阿米华晟',
      logo: 'http://www.amhszg.com/favicon.ico',
      description: '数据科技与数字服务解决方案提供商',
      website: 'http://www.amhszg.com/',
      industry: '数据科技'
    },
    {
      name: '滴滴地图（Didi Map）',
      logo: 'https://map.didichuxing.com/favicon.ico',
      description: '互联网地图与出行数据服务平台',
      website: 'https://map.didichuxing.com/',
      industry: '地图服务'
    },
    {
      name: '高德地图（Amap）',
      logo: 'https://a.amap.com/pc/static/img/logo-2x.png',
      description: '国内领先的数字地图与位置服务提供商',
      website: 'https://www.amap.com/',
      industry: '地图服务'
    },
    {
      name: '前海数据',
      logo: 'http://www.qhdata.cn/favicon.ico',
      description: '大数据管理与分析服务平台',
      website: 'http://www.qhdata.cn/',
      industry: '数据分析'
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
                  <div className="partner-logo-container">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="partner-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = 
                          `<div class="partner-logo-placeholder">${partner.name}</div>`;
                      }}
                    />
                  </div>
                  <div className="partner-info">
                    <h3 className="partner-name">{partner.name}</h3>
                    <p className="partner-industry">{partner.industry}</p>
                    <p className="partner-description">{partner.description}</p>
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="partner-link"
                    >
                      访问官网 →
                    </a>
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
                  <div className="partner-logo-container">
                    <img 
                      src={provider.logo} 
                      alt={provider.name}
                      className="partner-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = 
                          `<div class="partner-logo-placeholder">${provider.name}</div>`;
                      }}
                    />
                  </div>
                  <div className="partner-info">
                    <h3 className="partner-name">{provider.name}</h3>
                    <p className="partner-industry">{provider.industry}</p>
                    <p className="partner-description">{provider.description}</p>
                    <a 
                      href={provider.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="partner-link"
                    >
                      访问官网 →
                    </a>
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
                  <div className="partner-logo-container">
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="partner-logo"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = 
                          `<div class="partner-logo-placeholder">${partner.name}</div>`;
                      }}
                    />
                  </div>
                  <div className="partner-info">
                    <h3 className="partner-name">{partner.name}</h3>
                    <p className="partner-industry">{partner.industry}</p>
                    <p className="partner-description">{partner.description}</p>
                    <a 
                      href={partner.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="partner-link"
                    >
                      访问官网 →
                    </a>
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
