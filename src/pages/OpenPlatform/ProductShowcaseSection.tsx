import React from 'react';
import './ProductShowcaseSection.css';

interface Product {
  name: string;
  description: string;
  image: string;
  detailLink: string;
  tryLink: string;
}

export const OpenPlatformProductShowcase: React.FC = () => {
  const products: Product[] = [
    {
      name: '地图数据智联平台',
      description: '整合超 600 万条 AOI 数据与 4 亿条标准地址信息，覆盖现实世界 80% 以上末端场景',
      image: '🗺️',
      detailLink: 'https://lbs.sfmap.com.cn/product/map-data',
      tryLink: 'https://lbs.sfmap.com.cn/console/trial'
    },
    {
      name: '地址信息智能识别',
      description: '一键粘贴识别，自动填充必需字段，对错误地址进行纠偏修正，提升业务处理效率',
      image: '🔍',
      detailLink: 'https://lbs.sfmap.com.cn/product/address-recognition',
      tryLink: 'https://lbs.sfmap.com.cn/console/trial'
    },
    {
      name: '四级行政区划查询',
      description: '自动获取地址所含的省、市、区、街道四级行政区划信息，提升业务流程效率',
      image: '📍',
      detailLink: 'https://lbs.sfmap.com.cn/api/address/admin',
      tryLink: 'https://lbs.sfmap.com.cn/console/trial'
    },
    {
      name: '地址输入提示',
      description: '根据填写地址进行地址联想，语义准确度达 99.81%，协助用户快速准确填写地址',
      image: '💡',
      detailLink: 'https://lbs.sfmap.com.cn/api/address/suggest',
      tryLink: 'https://lbs.sfmap.com.cn/console/trial'
    },
    {
      name: '空间分析服务',
      description: '提供缓冲区分析、路径规划、热力图生成等高级空间分析能力',
      image: '📊',
      detailLink: 'https://lbs.sfmap.com.cn/product/spatial-analysis',
      tryLink: 'https://lbs.sfmap.com.cn/console/trial'
    },
    {
      name: '地图位置拾取',
      description: '在地图移动鼠标可查看位置，点击地图可拾取位置信息，包括：经纬度、地址和AOI信息',
      image: '📌',
      detailLink: 'https://lbs.sfmap.com.cn/tools/picker',
      tryLink: 'https://lbs.sfmap.com.cn/console/trial'
    }
  ];

  return (
    <section className="op-product-showcase">
      <div className="op-product-showcase-container">
        <h2 className="section-title">强大数据底座，高效连接世界万物</h2>
        
        <div className="product-cards-grid">
          {products.map((product, idx) => (
            <div key={idx} className="product-card">
              <div className="product-card-image">{product.image}</div>
              <div className="product-card-content">
                <h3 className="product-card-title">{product.name}</h3>
                <p className="product-card-description">{product.description}</p>
                <div className="product-card-actions">
                  <a href={product.detailLink} className="product-link" target="_blank" rel="noopener noreferrer">查看详情</a>
                  <a href={product.tryLink} className="product-try-btn" target="_blank" rel="noopener noreferrer">立即试用</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
