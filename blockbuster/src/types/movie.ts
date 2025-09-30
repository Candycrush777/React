export interface Movie {
  imdbID: string;      
  Title: string;       
  Year: string;        
  Type: string;       
  Poster: string;     
}

export interface MovieSearchResponse {
  Search: Movie[];     
  totalResults: string; 
  Response: string;    
}

export interface MovieErrorResponse {
  Response: string;    
  Error: string;       
}