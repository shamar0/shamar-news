"use client";

import Link from 'next/link';
import '../../../public/style.css'
import Category from './category';
import Image from 'next/image';

export default function Home({ data }) {
  const dataElements = [];
      for (let i = 0; i <data.length; i++) {
        dataElements.push(
          <div key={data[i].id} className="container card-container mt-5" >
            <div className="card" >
              <div className="row g-0 w-100 iic">
                <div className="col-md-4 image-container" 
                style={{ height: data[i].category === 'Entertainment' ? '200px' : 'auto' }}>
                  <Image height={200} width={300} src={data[i].img_url || 'https://static.vecteezy.com/system/resources/previews/000/197/882/original/vector-news-headlines-background-with-earth-planet.jpg'} className="img-fluid" alt="Card image" />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <p className="card-title" style={{ color: '#44444D', fontSize:"22px",lineHeight:"27px",fontWeight:"350" }}>{data[i].title}</p>
                    <p className="card-text">
                      <span className="card-text" style={{fontStyle:"italic", fontSize:"14px", fontWeight:"300"}}>Source: {data[i].source} {data[i].date}</span>
                      <br />
                      <span className="card-text" style={{color: '#44444D',fontSize:"16px",lineHeight:"22px",marginTop:"8px",fontWeight:"300"}}>{data[i].content}</span>
                      <br />
                      <Link className="card-text read-more" href={data[i].read_more} target="_blank" rel="noopener noreferrer">Read More</Link>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
  return (
      <div >
         <Category/>
         {dataElements}
      </div>
  );
}
