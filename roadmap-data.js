const ROADMAP_DAYS = [
  {
    day:1, title:"Introduction to Data Analytics", section:"Building a Strong Foundation", color:"yellow",
    desc:"Understand what data analytics is, types of analytics, and the role of a data analyst.",
    topics:[
      {name:"What is Data Analytics?", detail:"The practice of examining raw data to draw conclusions and support decisions.", concepts:"ETL pipelines, data lifecycle, business intelligence vs analytics"},
      {name:"Types of Data Analytics", detail:"Four main types that build on each other progressively.", concepts:"Descriptive → Diagnostic → Predictive → Prescriptive"},
      {name:"Descriptive Analytics", detail:"Summarizes historical data to understand what happened.", concepts:"KPIs, dashboards, monthly reports, trend analysis"},
      {name:"Diagnostic Analytics", detail:"Examines data to understand why something happened.", concepts:"Root cause analysis, drill-down, data discovery"},
      {name:"Predictive Analytics", detail:"Uses statistical models to forecast future outcomes.", concepts:"Regression, forecasting, probability models"},
      {name:"Prescriptive Analytics", detail:"Recommends actions based on analysis results.", concepts:"Optimization algorithms, simulation, decision analysis"},
      {name:"Role of a Data Analyst", detail:"Bridge between raw data and actionable business insights.", concepts:"Stakeholder communication, domain knowledge, analytical thinking"}
    ],
    resources:[{type:"article",title:"What Does a Data Analyst Do?",url:"#"},{type:"video",title:"Types of Data Analytics",url:"#"},{type:"course",title:"Introduction to Data Analytics",url:"#"}]
  },
  {
    day:2, title:"Analysis / Reporting with Excel", section:"Building a Strong Foundation", color:"orange",
    desc:"Master essential Excel functions for data analysis including lookup functions, text manipulation, and math operations.",
    topics:[
      {name:"IF & DATEIF", detail:"Conditional logic and date difference calculations.", concepts:"Nested IF, IFS, IFERROR, date arithmetic"},
      {name:"VLOOKUP / HLOOKUP", detail:"Look up values across tables vertically or horizontally.", concepts:"Exact vs approximate match, XLOOKUP as modern alternative"},
      {name:"REPLACE / SUBSTITUTE", detail:"Clean and transform text data in cells.", concepts:"String manipulation, data cleaning patterns"},
      {name:"UPPER / LOWER / PROPER", detail:"Standardize text case for consistency.", concepts:"Text normalization, data quality"},
      {name:"CONCAT & TRIM", detail:"Combine text and remove extra whitespace.", concepts:"TEXTJOIN, CONCATENATE, whitespace handling"},
      {name:"AVERAGE & COUNT", detail:"Statistical aggregation and counting functions.", concepts:"COUNTIF, AVERAGEIF, COUNTBLANK"},
      {name:"SUM & MIN / MAX", detail:"Mathematical aggregation across ranges.", concepts:"SUMIF, SUMPRODUCT, conditional aggregation"}
    ],
    resources:[{type:"course",title:"Excel for Data Analysis",url:"#"},{type:"article",title:"Top Excel Functions for Analysts",url:"#"}]
  },
  {
    day:3, title:"Key Concepts of Data", section:"Building a Strong Foundation", color:"yellow",
    desc:"Learn foundational concepts: collection, cleanup, exploration, visualization, statistical analysis, and ML basics.",
    topics:[
      {name:"Data Collection", detail:"Gathering data from multiple sources systematically.", concepts:"Surveys, APIs, databases, web scraping, IoT sensors"},
      {name:"Data Cleanup", detail:"Preparing raw data by fixing errors and inconsistencies.", concepts:"Missing values, duplicates, outliers, normalization"},
      {name:"Data Exploration", detail:"Initial investigation to discover patterns and anomalies.", concepts:"EDA, summary statistics, distribution analysis"},
      {name:"Data Visualisation", detail:"Representing data graphically for better understanding.", concepts:"Charts, graphs, dashboards, storytelling with data"},
      {name:"Statistical Analysis", detail:"Applying statistical methods to draw conclusions.", concepts:"Hypothesis testing, correlation, regression, ANOVA"},
      {name:"Machine Learning Basics", detail:"Automated pattern recognition from data.", concepts:"Supervised vs unsupervised, training/testing, model evaluation"}
    ],
    resources:[{type:"article",title:"Key Concepts in Data Science",url:"#"},{type:"video",title:"Data Analysis Pipeline",url:"#"}]
  },
  {
    day:4, title:"Learn SQL", section:"Building a Strong Foundation", color:"blue",
    desc:"SQL is the backbone of data analysis. Learn to query databases, join tables, and aggregate data.",
    topics:[
      {name:"SELECT, WHERE, ORDER BY", detail:"Core query clauses for retrieving and filtering data.", concepts:"Comparison operators, LIKE, IN, BETWEEN, NULL handling"},
      {name:"JOINs", detail:"Combine rows from multiple tables based on related columns.", concepts:"INNER, LEFT, RIGHT, FULL OUTER, CROSS, self-joins"},
      {name:"GROUP BY & HAVING", detail:"Aggregate data by categories and filter groups.", concepts:"COUNT, SUM, AVG with grouping, HAVING vs WHERE"},
      {name:"Subqueries & CTEs", detail:"Nested queries and Common Table Expressions for complex logic.", concepts:"Correlated subqueries, WITH clause, recursive CTEs"},
      {name:"Window Functions", detail:"Perform calculations across rows related to current row.", concepts:"ROW_NUMBER, RANK, LAG, LEAD, running totals"},
      {name:"CASE Statements", detail:"Add conditional logic directly in SQL queries.", concepts:"CASE WHEN, conditional aggregation, pivot-like queries"},
      {name:"Database Design", detail:"Understand how databases are structured.", concepts:"Primary/foreign keys, normalization, ER diagrams, indexes"}
    ],
    resources:[{type:"course",title:"DataCamp - Data Analyst in SQL",url:"#"},{type:"course",title:"Master SQL",url:"#"},{type:"article",title:"SQL for Data Analysts",url:"#"}]
  },
  {
    day:5, title:"Charting & Pivot Tables", section:"Building a Strong Foundation", color:"orange",
    desc:"Create meaningful charts and leverage pivot tables for summarizing large datasets.",
    topics:[
      {name:"Creating Charts in Excel", detail:"Select data ranges and insert appropriate chart types.", concepts:"Chart wizard, data series, formatting, chart elements"},
      {name:"Bar & Column Charts", detail:"Compare categories or show distributions.", concepts:"Clustered, stacked, 100% stacked variants"},
      {name:"Line & Area Charts", detail:"Show trends over time with continuous data.", concepts:"Multiple series, trendlines, sparklines"},
      {name:"Pie & Donut Charts", detail:"Show proportional composition of a whole.", concepts:"When to use vs bar charts, labeling best practices"},
      {name:"Pivot Tables", detail:"Summarize and analyze large datasets dynamically.", concepts:"Drag-and-drop fields, calculated fields, grouping"},
      {name:"Pivot Charts", detail:"Visual representations directly from pivot table data.", concepts:"Interactive filtering, slicers, timelines"}
    ],
    resources:[{type:"video",title:"Pivot Tables Masterclass",url:"#"},{type:"article",title:"Best Charting Practices",url:"#"}]
  },
  {
    day:6, title:"Learn a Programming Language", section:"Gain Programming Skills", color:"yellow",
    desc:"Choose Python or R as your primary language. Python is recommended for beginners.",
    topics:[
      {name:"Python vs R", detail:"Compare both languages for data analysis use cases.", concepts:"Ecosystem, libraries, community, job market"},
      {name:"Variables & Data Types", detail:"Store and manipulate different kinds of data.", concepts:"int, float, str, list, dict, tuple, set, bool"},
      {name:"Control Flow", detail:"Direct program execution with conditions and loops.", concepts:"if/elif/else, for loops, while loops, break/continue"},
      {name:"Functions & Modules", detail:"Organize reusable code into functions and import modules.", concepts:"def, return, *args, **kwargs, import, pip"},
      {name:"File I/O & Error Handling", detail:"Read/write files and handle runtime errors gracefully.", concepts:"open(), with statement, try/except, csv module"},
      {name:"Jupyter Notebooks", detail:"Interactive computing environment for data analysis.", concepts:"Cells, markdown, magic commands, kernel management"}
    ],
    resources:[{type:"course",title:"Python for Data Analysis",url:"#"},{type:"course",title:"DataCamp Python",url:"#"}]
  },
  {
    day:7, title:"Data Manipulation Libraries", section:"Gain Programming Skills", color:"orange",
    desc:"Master Pandas for efficient data manipulation, filtering, grouping, and transformation.",
    topics:[
      {name:"Series & DataFrames", detail:"Core Pandas data structures for 1D and 2D data.", concepts:"Creating, indexing, slicing, dtypes, shape"},
      {name:"Reading Data Files", detail:"Import data from CSV, Excel, JSON, and databases.", concepts:"read_csv, read_excel, read_json, read_sql"},
      {name:"Filtering & Selecting", detail:"Extract specific rows and columns based on conditions.", concepts:"Boolean indexing, .loc, .iloc, query method"},
      {name:"GroupBy & Aggregation", detail:"Split-apply-combine pattern for data summarization.", concepts:".groupby(), .agg(), transform, pivot_table"},
      {name:"Merging & Joining", detail:"Combine multiple DataFrames based on keys.", concepts:"merge(), join(), concat(), append()"},
      {name:"Dplyr Basics (R)", detail:"R alternative for data manipulation with pipe syntax.", concepts:"select, filter, mutate, summarize, arrange, %>%"}
    ],
    resources:[{type:"course",title:"Pandas Complete Guide",url:"#"},{type:"article",title:"Pandas vs Dplyr",url:"#"}]
  },
  {
    day:8, title:"Data Visualization Libraries", section:"Gain Programming Skills", color:"orange",
    desc:"Learn Matplotlib, Seaborn, and ggplot2 for publication-quality visualizations.",
    topics:[
      {name:"Matplotlib Fundamentals", detail:"Low-level plotting library with full control over every element.", concepts:"figure, axes, plt.plot(), plt.show(), subplots"},
      {name:"Seaborn Statistical Plots", detail:"High-level interface built on Matplotlib for statistical graphics.", concepts:"sns.scatterplot, sns.heatmap, sns.boxplot, themes"},
      {name:"Customizing Plots", detail:"Modify colors, labels, legends, and styles.", concepts:"Color palettes, annotations, axes formatting"},
      {name:"Subplots & Layout", detail:"Create multi-panel figures with organized layouts.", concepts:"fig.add_subplot, gridspec, tight_layout"},
      {name:"Ggplot2 (R)", detail:"Grammar of graphics approach to data visualization.", concepts:"aes(), geom_*, facet_wrap, themes, scales"},
      {name:"Exporting Visualizations", detail:"Save plots in various formats for reports and presentations.", concepts:"savefig(), DPI settings, vector vs raster formats"}
    ],
    resources:[{type:"article",title:"Matplotlib vs Seaborn",url:"#"},{type:"video",title:"Python Visualization Tutorial",url:"#"}]
  },
  {
    day:9, title:"Data Collection", section:"Mastering Data Handling", color:"yellow",
    desc:"Learn various methods of collecting data: databases, CSV files, APIs, and web scraping.",
    topics:[
      {name:"Connecting to Databases", detail:"Use Python connectors to query SQL databases.", concepts:"sqlite3, psycopg2, SQLAlchemy, connection strings"},
      {name:"Reading CSV & Flat Files", detail:"Parse structured text files into DataFrames.", concepts:"Delimiters, encoding, headers, chunked reading"},
      {name:"Working with APIs", detail:"Fetch data from REST APIs using HTTP requests.", concepts:"GET/POST, JSON parsing, authentication, rate limiting"},
      {name:"JSON & XML Parsing", detail:"Handle semi-structured data formats.", concepts:"json module, ElementTree, nested data flattening"},
      {name:"Web Scraping (BeautifulSoup)", detail:"Extract data from HTML web pages.", concepts:"Selectors, parsing, requests library, robots.txt"},
      {name:"Web Scraping (Scrapy)", detail:"Advanced framework for large-scale web scraping.", concepts:"Spiders, pipelines, middleware, concurrent requests"},
      {name:"Best Practices", detail:"Ensure data quality and ethical collection methods.", concepts:"Data governance, consent, sampling strategies"}
    ],
    resources:[{type:"course",title:"Web Scraping with Python",url:"#"},{type:"article",title:"REST API Collection Guide",url:"#"}]
  },
  {
    day:10, title:"Data Cleanup", section:"Mastering Data Handling", color:"yellow",
    desc:"Clean raw data by handling missing values, removing duplicates, finding outliers, and transforming data.",
    topics:[
      {name:"Handling Missing Data", detail:"Detect and fill or remove missing values appropriately.", concepts:"NaN detection, fillna(), dropna(), imputation strategies"},
      {name:"Removing Duplicates", detail:"Identify and eliminate duplicate records.", concepts:"duplicated(), drop_duplicates(), fuzzy matching"},
      {name:"Finding Outliers", detail:"Detect anomalous data points that may skew analysis.", concepts:"IQR method, Z-score, box plots, domain knowledge"},
      {name:"Data Transformation", detail:"Convert data types and normalize values.", concepts:"astype(), normalization, standardization, encoding"},
      {name:"String Cleaning & Regex", detail:"Clean text data using pattern matching.", concepts:"str.replace(), re module, pattern matching, extraction"},
      {name:"Pandas for Cleanup", detail:"Apply cleanup operations using Pandas methods.", concepts:"apply(), map(), pipe(), method chaining"},
      {name:"Dplyr for Cleanup", detail:"R alternative for data cleaning workflows.", concepts:"mutate(), filter(), case_when(), across()"}
    ],
    resources:[{type:"article",title:"Data Cleaning Checklist",url:"#"},{type:"video",title:"Data Wrangling with Pandas",url:"#"}]
  },
  {
    day:11, title:"Descriptive Analysis", section:"Data Analysis Techniques", color:"yellow",
    desc:"Generate statistics and visualize distributions using central tendency, dispersion, and shape measures.",
    topics:[
      {name:"Mean, Median, Mode", detail:"Measures of central tendency showing typical values.", concepts:"When to use each, sensitivity to outliers, trimmed mean"},
      {name:"Range, Variance, Std Dev", detail:"Measures of spread showing how data is distributed.", concepts:"Population vs sample variance, coefficient of variation"},
      {name:"Dispersion Measures", detail:"Quantify the spread and variability of data.", concepts:"IQR, percentiles, quartiles, box-and-whisker plots"},
      {name:"Central Tendency", detail:"Identify the center point of a data distribution.", concepts:"Weighted mean, geometric mean, harmonic mean"},
      {name:"Distribution Shape", detail:"Understand the symmetry and tail behavior of data.", concepts:"Skewness (left/right), kurtosis (heavy/light tails)"},
      {name:"Summary Statistics", detail:"Generate comprehensive statistical overviews.", concepts:"describe(), five-number summary, frequency tables"},
      {name:"Visualizing Distributions", detail:"Plot data distributions to understand patterns.", concepts:"Histograms, KDE plots, Q-Q plots, violin plots"}
    ],
    resources:[{type:"course",title:"Statistics for Data Science",url:"#"},{type:"article",title:"Descriptive Statistics Explained",url:"#"}]
  },
  {
    day:12, title:"Data Visualization — Tools", section:"Data Analysis Techniques", color:"yellow",
    desc:"Master visualization tools like Tableau, Power BI to present insights effectively.",
    topics:[
      {name:"Tableau Fundamentals", detail:"Drag-and-drop visual analytics platform.", concepts:"Worksheets, calculated fields, LOD expressions"},
      {name:"Power BI Basics", detail:"Microsoft's business intelligence and reporting tool.", concepts:"DAX formulas, Power Query, data modeling"},
      {name:"Connecting Data Sources", detail:"Link to databases, files, and cloud services.", concepts:"Live vs extract connections, data blending, unions"},
      {name:"Building Dashboards", detail:"Create interactive multi-view dashboards.", concepts:"Layout design, actions, filters, containers"},
      {name:"Interactive Filters", detail:"Add user-controlled filtering to dashboards.", concepts:"Parameters, slicers, cascading filters, sets"},
      {name:"Advanced Seaborn/Matplotlib", detail:"Create complex multi-layered visualizations in code.", concepts:"FacetGrid, PairGrid, custom colormaps, annotations"}
    ],
    resources:[{type:"course",title:"Tableau for Beginners",url:"#"},{type:"video",title:"Power BI Full Tutorial",url:"#"}]
  },
  {
    day:13, title:"Data Visualization — Charting", section:"Data Analysis Techniques", color:"orange",
    desc:"Choose and create the right chart types for different data stories.",
    topics:[
      {name:"Bar Charts & Histograms", detail:"Compare categories or show frequency distributions.", concepts:"Binning, grouped bars, normalized histograms"},
      {name:"Line & Area Charts", detail:"Display trends and changes over continuous intervals.", concepts:"Multiple series, filled areas, dual-axis charts"},
      {name:"Scatter & Bubble Charts", detail:"Show relationships between two or three variables.", concepts:"Correlation visualization, size encoding, clusters"},
      {name:"Heatmaps", detail:"Display matrix data using color intensity.", concepts:"Correlation matrices, calendar heatmaps, annotations"},
      {name:"Stacked Charts", detail:"Show composition and totals simultaneously.", concepts:"Stacked bar, stacked area, 100% stacked variants"},
      {name:"Funnel & Pie Charts", detail:"Show sequential drop-off or proportional composition.", concepts:"Conversion funnels, treemaps as pie alternatives"}
    ],
    resources:[{type:"article",title:"Chart Selection Guide",url:"#"},{type:"video",title:"Advanced Chart Types",url:"#"}]
  },
  {
    day:14, title:"Statistical Analysis", section:"Data Analysis Techniques", color:"yellow",
    desc:"Analyze relationships and make data-driven decisions with hypothesis testing, correlation, regression.",
    topics:[
      {name:"Hypothesis Testing", detail:"Test assumptions about populations using sample data.", concepts:"Null/alternative hypothesis, t-test, chi-square, z-test"},
      {name:"P-values & Significance", detail:"Determine statistical significance of results.", concepts:"Alpha levels, Type I/II errors, confidence intervals"},
      {name:"Correlation Analysis", detail:"Measure the strength and direction of relationships.", concepts:"Pearson r, Spearman rho, correlation matrix, causation"},
      {name:"Linear Regression", detail:"Model the relationship between variables with a line.", concepts:"Slope, intercept, R², residuals, assumptions"},
      {name:"Multiple Regression", detail:"Extend regression to multiple predictor variables.", concepts:"Multicollinearity, adjusted R², feature selection"},
      {name:"ANOVA", detail:"Compare means across multiple groups.", concepts:"One-way, two-way, post-hoc tests, effect size"},
      {name:"Data-Driven Decisions", detail:"Translate statistical findings into business recommendations.", concepts:"Confidence levels, practical significance, A/B testing"}
    ],
    resources:[{type:"course",title:"Statistical Thinking in Python",url:"#"},{type:"article",title:"Hypothesis Testing Guide",url:"#"}]
  },
  {
    day:15, title:"Machine Learning Basics", section:"Advanced Topics", color:"yellow",
    desc:"Understand different types of machine learning and when to apply them.",
    topics:[
      {name:"Supervised Learning", detail:"Learn from labeled data to predict outcomes.", concepts:"Training labels, classification, regression tasks"},
      {name:"Unsupervised Learning", detail:"Find patterns in data without predefined labels.", concepts:"Clustering, dimensionality reduction, anomaly detection"},
      {name:"Reinforcement Learning", detail:"Learn through trial-and-error with rewards.", concepts:"Agent, environment, reward function, Q-learning"},
      {name:"Classification vs Regression", detail:"Predict categories or continuous values.", concepts:"Binary/multiclass, output types, evaluation metrics"},
      {name:"Train/Test Split", detail:"Divide data for model building and evaluation.", concepts:"80/20 split, stratification, data leakage prevention"},
      {name:"Cross-Validation", detail:"Robust model evaluation using multiple data folds.", concepts:"K-fold, stratified K-fold, leave-one-out"},
      {name:"Overfitting & Underfitting", detail:"Balance model complexity for generalization.", concepts:"Bias-variance tradeoff, regularization, learning curves"}
    ],
    resources:[{type:"course",title:"Intro to Machine Learning",url:"#"},{type:"article",title:"ML Types Explained",url:"#"}]
  },
  {
    day:16, title:"Popular ML Algorithms", section:"Advanced Topics", color:"orange",
    desc:"Learn the most commonly used ML algorithms that data analysts should know.",
    topics:[
      {name:"Decision Trees", detail:"Tree-based models that split data on feature conditions.", concepts:"Gini impurity, information gain, pruning, depth"},
      {name:"Random Forests", detail:"Ensemble of decision trees for better accuracy.", concepts:"Bagging, feature importance, out-of-bag error"},
      {name:"Naive Bayes", detail:"Probabilistic classifier based on Bayes' theorem.", concepts:"Prior/posterior probability, text classification"},
      {name:"K-Nearest Neighbors", detail:"Classify by majority vote of k nearest data points.", concepts:"Distance metrics, choosing k, curse of dimensionality"},
      {name:"K-Means Clustering", detail:"Partition data into k groups by centroid distance.", concepts:"Elbow method, silhouette score, initialization"},
      {name:"Logistic Regression", detail:"Predict probabilities for binary classification.", concepts:"Sigmoid function, odds ratio, threshold tuning"},
      {name:"SVM", detail:"Find optimal hyperplane separating classes.", concepts:"Margin maximization, kernel trick, soft margin"}
    ],
    resources:[{type:"article",title:"Top 10 ML Algorithms",url:"#"},{type:"video",title:"ML Algorithms Visualized",url:"#"}]
  },
  {
    day:17, title:"Model Evaluation Techniques", section:"Advanced Topics", color:"orange",
    desc:"Properly evaluate and validate machine learning models.",
    topics:[
      {name:"Accuracy, Precision, Recall", detail:"Core classification performance metrics.", concepts:"F1-score, macro/micro averaging, class imbalance"},
      {name:"Confusion Matrix", detail:"Tabulate true/false positives and negatives.", concepts:"TP, FP, TN, FN, sensitivity, specificity"},
      {name:"ROC Curves & AUC", detail:"Visualize classifier performance across thresholds.", concepts:"True positive rate, false positive rate, area under curve"},
      {name:"Cross-Validation Strategies", detail:"Robust evaluation with multiple train/test splits.", concepts:"K-fold, stratified, time-series split, nested CV"},
      {name:"Bias-Variance Tradeoff", detail:"Balance underfitting and overfitting.", concepts:"Model complexity, regularization, ensemble methods"},
      {name:"Feature Selection", detail:"Choose the most relevant features for modeling.", concepts:"Correlation, mutual information, recursive elimination"},
      {name:"Model Comparison", detail:"Systematically compare different algorithms.", concepts:"Grid search, random search, statistical tests"}
    ],
    resources:[{type:"course",title:"Model Evaluation in Python",url:"#"},{type:"article",title:"Understanding Confusion Matrix",url:"#"}]
  },
  {
    day:18, title:"Deep Learning (Optional)", section:"Advanced Topics", color:"yellow",
    desc:"Explore neural networks and deep learning — an optional but valuable skill.",
    topics:[
      {name:"Neural Network Basics", detail:"Understand artificial neurons, layers, and learning.", concepts:"Perceptron, activation functions, forward/back propagation"},
      {name:"Layers & Architecture", detail:"Build networks with input, hidden, and output layers.", concepts:"Dense layers, dropout, batch normalization"},
      {name:"CNNs", detail:"Convolutional Neural Networks for image/spatial data.", concepts:"Convolution, pooling, filters, feature maps"},
      {name:"RNNs", detail:"Recurrent Neural Networks for sequential data.", concepts:"Hidden state, LSTM, GRU, sequence-to-sequence"},
      {name:"TensorFlow", detail:"Google's open-source deep learning framework.", concepts:"Tensors, Keras API, model.fit(), callbacks"},
      {name:"PyTorch", detail:"Facebook's flexible deep learning framework.", concepts:"Dynamic graphs, autograd, DataLoader, nn.Module"},
      {name:"Practice Projects", detail:"Apply deep learning to real problems.", concepts:"Image recognition, NLP sentiment analysis, time series"}
    ],
    resources:[{type:"course",title:"Deep Learning Fundamentals",url:"#"},{type:"video",title:"Neural Networks Explained",url:"#"}]
  },
  {
    day:19, title:"Big Data Technologies", section:"Advanced Topics", color:"yellow",
    desc:"Understand big data concepts, storage solutions, and processing frameworks.",
    topics:[
      {name:"Big Data Concepts", detail:"Understand the characteristics of big data.", concepts:"5 V's: Volume, Velocity, Variety, Veracity, Value"},
      {name:"Data Storage Solutions", detail:"Where and how to store massive datasets.", concepts:"Data Lakes, Data Warehouses, HDFS, cloud storage"},
      {name:"Hadoop Ecosystem", detail:"Open-source framework for distributed processing.", concepts:"HDFS, MapReduce, YARN, Hive, Pig"},
      {name:"Apache Spark", detail:"Fast, unified analytics engine for big data.", concepts:"RDDs, DataFrames, SparkSQL, PySpark"},
      {name:"Processing Techniques", detail:"Methods for handling data at scale.", concepts:"Batch vs stream processing, ETL pipelines"},
      {name:"Parallel Processing", detail:"Distribute computation across multiple machines.", concepts:"MapReduce paradigm, MPI, partitioning strategies"},
      {name:"Cloud Platforms", detail:"Cloud-based big data services.", concepts:"AWS (Redshift, S3), GCP (BigQuery), Azure (Synapse)"}
    ],
    resources:[{type:"course",title:"Big Data Fundamentals",url:"#"},{type:"article",title:"Hadoop vs Spark",url:"#"}]
  },
  {
    day:20, title:"Portfolio & Projects", section:"Next Steps", color:"blue",
    desc:"Build your portfolio with real-world projects to showcase your skills.",
    topics:[
      {name:"Building a Portfolio", detail:"Create a collection of your best data analysis work.", concepts:"GitHub repos, project READMEs, Jupyter notebooks"},
      {name:"Kaggle Competitions", detail:"Practice with real datasets in competitive environment.", concepts:"Kernels, discussions, datasets, rankings"},
      {name:"EDA Project", detail:"End-to-end exploratory data analysis on a real dataset.", concepts:"Data cleaning, visualization, insights, storytelling"},
      {name:"Dashboard Project", detail:"Build an interactive dashboard with Tableau/Power BI.", concepts:"KPI tracking, filters, drill-downs, publishing"},
      {name:"GitHub for Analysts", detail:"Version control and showcase your work.", concepts:"Repositories, branches, commits, GitHub Pages"},
      {name:"Documentation", detail:"Write clear project documentation and reports.", concepts:"README files, data dictionaries, methodology notes"},
      {name:"Personal Website", detail:"Create an online presence to attract employers.", concepts:"Portfolio site, blog posts, project showcases"}
    ],
    resources:[{type:"article",title:"Building a Data Analyst Portfolio",url:"#"},{type:"course",title:"Kaggle Micro-Courses",url:"#"}]
  },
  {
    day:21, title:"Career & Continuous Learning", section:"Next Steps", color:"blue",
    desc:"Prepare for interviews, explore career paths, and plan for continuous learning.",
    topics:[
      {name:"Interview Prep", detail:"Practice common data analyst interview questions.", concepts:"SQL challenges, case studies, behavioral questions"},
      {name:"Resume Tips", detail:"Craft a data analyst resume that stands out.", concepts:"Quantified achievements, technical skills section, ATS"},
      {name:"Certifications", detail:"Earn recognized credentials to boost your profile.", concepts:"Google Data Analytics, IBM, Microsoft PL-300"},
      {name:"Online Learning", detail:"Continue growing with structured courses.", concepts:"Coursera, edX, Udemy, DataCamp, LinkedIn Learning"},
      {name:"Networking", detail:"Build professional connections in the data community.", concepts:"LinkedIn, meetups, conferences, Discord communities"},
      {name:"Staying Updated", detail:"Keep up with evolving tools and techniques.", concepts:"Blogs, newsletters, podcasts, research papers"},
      {name:"Career Growth", detail:"Plan your path from analyst to senior roles.", concepts:"Analyst → Senior → Lead → Data Scientist/Engineer"}
    ],
    resources:[{type:"article",title:"Data Analyst Career Path",url:"#"},{type:"course",title:"Google Data Analytics Certificate",url:"#"},{type:"video",title:"Day in the Life of a Data Analyst",url:"#"}]
  }
];

const SECTIONS = [
  {id:"foundation",label:"Building a Strong Foundation",days:[1,2,3,4,5],layout:"foundation"},
  {id:"programming",label:"Gain Programming Skills",days:[6,7,8],layout:"horizontal"},
  {id:"data-handling",label:"Mastering Data Handling",days:[9,10],layout:"horizontal"},
  {id:"analysis",label:"Data Analysis Techniques",days:[11,12,13,14],layout:"analysis"},
  {id:"advanced",label:"Advanced Topics",days:[15,16,17,18,19],layout:"advanced"},
  {id:"next",label:"Next Steps",days:[20,21],layout:"horizontal"}
];
