"use client";
import axios from "axios";
import Link from 'next/link';
import '../../../public/style.css'
import Category from './category';
import Image from 'next/image';
import { useContext, useEffect, useState } from "react";
import UserContext from '../contex/UserContex';

export default function Home({ data }) {
  const {user} = useContext(UserContext);
  const [mysavedArticles, setMySavedArticles] = useState([]);
  
  useEffect(() => {
    if (user) {
      setMySavedArticles(user.savedArticles || []);
    }
  }, [user]);


  const saveArticle = async (articleId) => {
    if (!user) {
      alert("You need to log in to save articles.");
      router.push('/login');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.BACKEND_API}/users/save-article`, { articleId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMySavedArticles(prevSavedArticles => [...prevSavedArticles, articleId]);
      // alert('Article saved successfully!');
    } catch (error) {
      console.error('Error saving article:', error);
      alert('Error saving article.');
    }
  };


  const removeArticle = async (articleId) => {
    if (!user) {
      alert("You need to log in to save articles.");
      router.push('/login');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.BACKEND_API}/users/remove-article`, { articleId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      setMySavedArticles(prevSavedArticles => prevSavedArticles.filter(id => id !== articleId));
      // alert('Article removed successfully!');
    } catch (error) {
      console.error('Error removing article:', error.response ? error.response.data : error.message);
      alert('Error removing article.');
    }
  };

  const handleShare = async (title,read_more) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: read_more, 
        });
        console.log('Content shared successfully!');
      } catch (error) {
        console.error('Error sharing content:', error);
      }
    } else {
      // Fallback for unsupported browsers
      navigator.clipboard.writeText(read_more).then(() => {
        alert('Link copied to clipboard!');
      }, (error) => {
        console.error('Could not copy text:', error);
      });
    }
  };
  
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
                      {
                        mysavedArticles.includes(data[i]._id) ?
                         (<>
                          <button className='card-save-article' onClick={() => removeArticle(data[i]._id)}><i className="fa-solid fa-bookmark"></i> Saved</button>
                        </>):(<>
                          <button className='card-save-article' onClick={() => saveArticle(data[i]._id)}><i className="fa-regular fa-bookmark"></i> Save</button>
                        </>)
                      }
                      <button style={{position:"absolute",right:"2.5%"}} className='card-save-article'  onClick={() => handleShare(data[i].title,data[i].read_more)}><i className="fa-solid fa-share-nodes"></i> Share</button>
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
