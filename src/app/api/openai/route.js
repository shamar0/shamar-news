import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req) {
  try { 
    const { transcript } = await req.json();

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        "model": "gpt-3.5-turbo",
        "messages": [
          {
            "role": "system",
            "content": "You are a voice command assistant of a news website that maps user inputs to specific categories and actions. Use the keyword mappings below to understand which category or action the user is referring to and return the appropriate function name with parenthesis(), remember if function name is to be returned then return only one function name don't write any additional thing with it. But if it's a general question or unknown command, provide a natural language response."
          },
          {
            "role": "assistant",
            "content": "Here are the available functions:\n" +
           "Category Mappings:\n" +
             "1. **Technology**: 'latest phone', 'mobile', 'gadgets', 'AI', 'machine learning', 'robotics', 'computers' -> clickTechnologyCategory()\n" +
             "2. **Sports**: 'Olympics', 'football', 'NBA', 'cricket', 'tournament', 'FIFA', 'sports event' -> clickSportsCategory()\n" +
             "3. **Business**: 'stocks', 'market trends', 'startups', 'investments' -> clickBusinessCategory()\n" +
             "4. **Entertainment**: 'movies', 'TV shows', 'celebrities', 'music', 'Hollywood' -> clickEntertainmentCategory()\n" +
             "5. **Politics**: 'elections', 'government', 'policies', 'political news' -> clickPoliticsCategory()\n" +
             "6. **Health**: 'medicine', 'fitness', 'well-being', 'COVID', 'vaccination', 'mental health' -> clickHealthCategory()\n" +
             "7. **Education**: 'schools', 'universities', 'learning', 'courses', 'scholarships' -> clickEducationCategory()\n" +
             "8. **Environment/Science**: 'climate change', 'space', 'research', 'weather' -> clickScienceOrEnvironmentCategory()\n" +
             "9. **Trending**: 'latest', 'trending', 'new arrivals', 'new articles' -> clickTrendingCategory()\n" +
             "10. **Ev**: 'Electric Vehicles', 'EV', 'Ev news' -> clickEvCategory()\n" +
             "11. **It**: 'corporate news', 'TCS News', 'IT companies' -> clickItCategory()\n" +
             "12. **All**: 'move to home page', 'All News', -> clickAllCategory()\n" +
             "13. **Headline**: 'read headline', 'read article', 'read this shown articles', -> readHeadline()\n" +
             "Action Mappings:\n" +
             "1. 'scroll down', 'show more', 'more content', 'next section' -> scrollDown()\n" +
             "2. 'scroll up', 'previous section', 'go up' -> scrollUp()\n" +
             "3. 'load more', 'show more articles', 'next page' -> loadMoreContent()\n" +
             "4. 'search', 'want to search something', 'find', 'look up' -> openSearch()\n"
          },
          
          {
            "role": "user",
            "content": transcript
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, 
        },
      }
    );

    const result = response.data.choices[0].message.content;
    return NextResponse.json({ message: result });
  } catch (error) {
    console.error('Error calling OpenAI:', error.response ? error.response.data : error.message);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}




