// Format date from yyyy-mm-dd to Mon DD, YYYY
export const formatDate = (dateString: string): string => {
  if (!dateString) return 'N/A';
  
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  
  return new Date(dateString).toLocaleDateString('en-US', options);
};

// Format runtime from minutes to hours and minutes
export const formatRuntime = (minutes: number): string => {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

// Format currency with commas
export const formatCurrency = (amount: number): string => {
  if (!amount) return '$0';
  
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

// Get full image URL from TMDB path
export const getImageUrl = (
  path: string | null, 
  size: 'poster' | 'backdrop' | 'profile' = 'poster', 
  dimensions?: 'small' | 'medium' | 'large'
): string => {
  if (!path) {
    return size === 'poster'
      ? 'https://via.placeholder.com/500x750?text=No+Image'
      : size === 'profile'
      ? 'https://via.placeholder.com/300x450?text=No+Profile'
      : 'https://via.placeholder.com/1280x720?text=No+Backdrop';
  }
  
  const baseUrl = 'https://image.tmdb.org/t/p';
  
  // Choose size based on dimensions and type
  if (size === 'poster') {
    if (dimensions === 'small') return `${baseUrl}/w185${path}`;
    if (dimensions === 'medium') return `${baseUrl}/w342${path}`;
    return `${baseUrl}/w500${path}`; // large or default
  }
  
  if (size === 'profile') {
    if (dimensions === 'small') return `${baseUrl}/w45${path}`;
    if (dimensions === 'medium') return `${baseUrl}/w185${path}`;
    return `${baseUrl}/h632${path}`; // large or default
  }
  
  // For backdrop
  if (dimensions === 'small') return `${baseUrl}/w300${path}`;
  if (dimensions === 'medium') return `${baseUrl}/w780${path}`;
  return `${baseUrl}/w1280${path}`; // large or default
};

// Format rating to display with one decimal place
export const formatRating = (rating: number): string => {
  if (rating === undefined || rating === null) return 'N/A';
  return rating.toFixed(1);
};

// Truncate text based on max length
export const truncateText = (text: string | null | undefined, maxLength: number): string => {
  if (!text) return '';
  
  if (text.length <= maxLength) {
    return text;
  }
  
  return `${text.substring(0, maxLength).trim()}...`;
};

// Format names list (e.g. directors, actors)
export const formatNamesList = (names: string[], limit: number = 3): string => {
  if (!names || names.length === 0) return 'N/A';
  
  if (names.length <= limit) {
    return names.join(', ');
  }
  
  return `${names.slice(0, limit).join(', ')} +${names.length - limit} more`;
};
