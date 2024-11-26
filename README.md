# Absolute Cinema

**Absolute Cinema** is a web platform for movie reviews, designed to transform cinema into an educational, inclusive, and interactive experience. Inspired by the philosophical impact of the movie *Good Will Hunting*, the platform leverages technology to connect people through cinema, fostering critical reflection and meaningful cultural connections.

---

## Main Features

- **Movie Search**  
  Search bar integrated with the OMDB API, enabling detailed searches by title or keyword, displaying synopsis, cast, genre, and release year.

- **Movie Reviews**  
  Authenticated users can rate movies from 1 to 10, storing their reviews in the database for future analysis.

- **Analytical Dashboard**  
  Includes KPIs such as most reviewed and highest-rated movies (average above 8), along with charts for top-rated genres and geographic analysis of regional preferences.

- **Personalized Recommendations**  
  Suggestions based on users' favorite genres in different regions, supporting both viewers and movie marketing strategies.

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js
- **Database:** MySQL
- **Integration:** OMDB API

---

## How to Run the Project

1. **Clone this repository:**
   ```bash
   git clone https://github.com/your-username/absolute-cinema.git
   ```

2. **Install dependencies:**
   ```bash
   cd absolute-cinema
   npm install
   ```

3. **Configure the Database:**
   - Create a MySQL database and adjust the settings in the `.env` file.

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Access the application:**
   Open [http://localhost:3300](http://localhost:3300) in your browser.

---

## Assumptions

- **Language:** All pages are in English to align with the default language of the OMDB API.
- **Compatibility:** The system is compatible with modern browsers and mobile devices.

---

## Contribution

1. Fork the repository.  
2. Create a branch for your feature (`git checkout -b feature/new-feature`).  
3. Commit your changes (`git commit -m 'Add new feature'`).  
4. Push to the branch (`git push origin feature/new-feature`).  
5. Open a Pull Request.

---

## References

- [OMDB API](https://www.omdbapi.com/)  
- [Node.js](https://nodejs.org/)  
- [Chart.js](https://www.chartjs.org/)
- [Parallax Scroll - Lun Dev](https://github.com/HoanghoDev/parallax_scroll)
- [web-data-viz - SPTech](https://github.com/BandTec/web-data-viz)

---

**Author:** Gustavo Oliveira  
**Institution:** São Paulo Tech School