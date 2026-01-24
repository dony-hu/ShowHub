import React from 'react';
import './APIsSection.css';

interface APIItem {
  name: string;
  description: string;
  link: string;
}

interface APICategory {
  category: string;
  icon: string;
  apis: APIItem[];
}

export const OpenPlatformAPIs: React.FC = () => {
  const apiCategories: APICategory[] = [
    {
      category: '地址服务',
      icon: '📍',
      apis: [
        { name: '地址级别判断', description: '识别地址精度级别，判断到省/市/区/街道/门牌号等层级', link: 'https://lbs.sfmap.com.cn/api/address/level' },
        { name: '四级行政区划查询', description: '自动获取地址所含的省、市、区、街道四级行政区划信息', link: 'https://lbs.sfmap.com.cn/api/address/admin' },
        { name: '地址输入提示', description: '根据填写地址进行地址联想，语义准确度达99.81%', link: 'https://lbs.sfmap.com.cn/api/address/suggest' },
        { name: '地理编码', description: '将结构化地址转换为经纬度坐标，支持批量查询', link: 'https://lbs.sfmap.com.cn/api/geocoding' },
        { name: '逆地理编码', description: '将经纬度坐标转换为结构化地址信息', link: 'https://lbs.sfmap.com.cn/api/reverse-geocoding' },
        { name: '地址真实性校验', description: '验证地址是否真实存在，提升数据质量', link: 'https://lbs.sfmap.com.cn/api/address/verify' },
        { name: '地址类型识别', description: '自动识别地址类型：住宅、商业、工业等', link: 'https://lbs.sfmap.com.cn/api/address/type' }
      ]
    },
    {
      category: '路线与导航',
      icon: '🗺️',
      apis: [
        { name: '五级地址解析', description: '精确解析到省市区街道门牌号五级地址结构', link: 'https://lbs.sfmap.com.cn/api/address/parse' },
        { name: '智能地址填写', description: '智能联想补全，提升用户填写地址效率', link: 'https://lbs.sfmap.com.cn/api/address/smart' },
        { name: '货车路径规划', description: '考虑车辆限行、载重等因素的专业货车路径规划', link: 'https://lbs.sfmap.com.cn/api/route/truck' },
        { name: '定位SDK（iOS）', description: 'iOS平台定位SDK，提供精准的位置服务', link: 'https://lbs.sfmap.com.cn/sdk/location/ios' },
        { name: '定位SDK（Android）', description: 'Android平台定位SDK，支持多种定位模式', link: 'https://lbs.sfmap.com.cn/sdk/location/android' }
      ]
    },
    {
      category: '鹰眼定位',
      icon: '🎯',
      apis: [
        { name: '定位SDK（iOS）', description: 'iOS平台高精度定位服务，支持轨迹记录', link: 'https://lbs.sfmap.com.cn/sdk/eagle/ios' },
        { name: '定位SDK（Android）', description: 'Android平台实时定位追踪，支持多设备管理', link: 'https://lbs.sfmap.com.cn/sdk/eagle/android' }
      ]
    },
    {
      category: '地图服务',
      icon: '🗺️',
      apis: [
        { name: '地图SDK（iOS）', description: 'iOS平台地图展示SDK，支持自定义样式和图层', link: 'https://lbs.sfmap.com.cn/sdk/map/ios' },
        { name: '地图SDK（Android）', description: 'Android平台地图SDK，提供丰富的交互能力', link: 'https://lbs.sfmap.com.cn/sdk/map/android' },
        { name: '地图JS-API', description: 'Web端地图API，支持H5和小程序', link: 'https://lbs.sfmap.com.cn/api/map/jsapi' }
      ]
    },
    {
      category: '企业服务',
      icon: '🏢',
      apis: [
        { name: '企业实际经营地址查询', description: '查询企业真实经营地址，支持工商数据验证', link: 'https://lbs.sfmap.com.cn/api/company/address' },
        { name: '企业注册地址验真', description: '验证企业注册地址的真实性和有效性', link: 'https://lbs.sfmap.com.cn/api/company/verify' },
        { name: '企业活跃度', description: '评估企业经营活跃度和信用状况', link: 'https://lbs.sfmap.com.cn/api/company/activity' },
        { name: '企业注册地址一致性判断', description: '判断企业注册地址与实际经营地址的一致性', link: 'https://lbs.sfmap.com.cn/api/company/consistency' },
        { name: '所在楼栋字查询', description: '查询指定楼栋的详细信息和入驻企业', link: 'https://lbs.sfmap.com.cn/api/building/info' },
        { name: '楼宇查询入驻企业', description: '根据楼宇查询所有入驻企业列表', link: 'https://lbs.sfmap.com.cn/api/building/companies' },
        { name: '楼宇查询注册企业', description: '查询在该楼宇注册的所有企业信息', link: 'https://lbs.sfmap.com.cn/api/building/registered' }
      ]
    },
    {
      category: '特色服务',
      icon: '⭐',
      apis: [
        { name: '楼宇电梯识别', description: '智能识别楼宇电梯信息，优化配送路径', link: 'https://lbs.sfmap.com.cn/api/building/elevator' },
        { name: '运单实时轨迹', description: '实时追踪运单配送轨迹，提升客户体验', link: 'https://lbs.sfmap.com.cn/api/shipment/track' },
        { name: '上门可投递识别', description: '判断地址是否支持上门投递服务', link: 'https://lbs.sfmap.com.cn/api/delivery/detect' }
      ]
    },
    {
      category: '地图工具',
      icon: '🔧',
      apis: [
        { name: '丰图网格管家', description: '网格化管理工具，支持区域划分和数据统计', link: 'https://lbs.sfmap.com.cn/tools/grid' },
        { name: '地图数据上图', description: '批量导入数据在地图上可视化展示', link: 'https://lbs.sfmap.com.cn/tools/visualization' },
        { name: '地图位置拾取', description: '在地图上点击获取位置经纬度和地址信息', link: 'https://lbs.sfmap.com.cn/tools/picker' },
        { name: '地图分享工具', description: '生成地图分享链接，支持自定义标注', link: 'https://lbs.sfmap.com.cn/tools/share' }
      ]
    }
  ];

  return (
    <section className="op-apis">
      <div className="op-apis-container">
        <h2 className="section-title">开放能力</h2>
        <p className="section-subtitle">
          丰图开放平台提供的完整 API 服务清单，覆盖地址、定位、地图、企业等多个领域
        </p>

        <div className="apis-content">
          {apiCategories.map((categoryData, idx) => (
            <div key={idx} className="api-category">
              <div className="category-header">
                <span className="category-icon">{categoryData.icon}</span>
                <h3 className="category-title">{categoryData.category}</h3>
                <span className="category-count">{categoryData.apis.length} 项服务</span>
              </div>
              <div className="api-items">
                {categoryData.apis.map((api, apiIdx) => (
                  <div key={apiIdx} className="api-item">
                    <div className="api-content">
                      <h4 className="api-name">{api.name}</h4>
                      <p className="api-description">{api.description}</p>
                    </div>
                    <div className="api-actions">
                      <a href={api.link} className="api-link" target="_blank" rel="noopener noreferrer">
                        查看文档 →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
