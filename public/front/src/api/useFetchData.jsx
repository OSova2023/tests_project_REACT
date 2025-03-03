import { useState, useEffect } from 'react';

function useFetchData(extractDomain, setSites, setTests) {
  useEffect(() => {
    async function fetchData() {
      try {
        const sitesResponse = await fetch('http://localhost:3100/sites');
        const sitesData = await sitesResponse.json();
        const sites = sitesData.map(item => ({
          ...item,
          exName: extractDomain(item.url),
        }));

        const testsResponse = await fetch('http://localhost:3100/tests');
        const testsData = await testsResponse.json();

        setSites(sites);
        setTests(testsData);

        if (testsData.length > 0 && sites.length > 0) {
          setTests(prev =>
            prev.map(item => ({
              ...item,
              site: sites.find(site => site.id === item.siteId)?.exName,
            }))
          );
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    }
    fetchData();
  }, []); 

}

export default useFetchData;

// useEffect(() => {
  //   async function fetchData() {     
  //       try {
  //         const promise1 =  await fetch('http://localhost:3100/sites').then(res => res.json()).then(data => {
  //           setSites(data.map((item)=>{
  //               return {...item, exName: extractDomain(item.url)}
  //             }))
  //             return sites
  //           }).catch((err) => console.error('Error fetching sites:', err));    
        
  //           const promise2 = await fetch('http://localhost:3100/tests').then(res => res.json()).then(data => setTests(data)).catch((error) => console.error('Error fetching tests:', error));
  //           // НЕ РАБОТАЕТ
  //          if (tests.length > 0 && sites.length > 0) setTests(prev => 
  //               prev.map(item =>{ return {...item, site: sites.filter(site => site.id === item.siteId)?.exName}}));
  //       } catch (err) {
  //         console.error('Error fetching data:', err);
  //       }           
    
  //   }
  //   fetchData()     
  // }, [])