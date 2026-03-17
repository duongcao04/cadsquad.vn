// import hljs from 'highlight.js'
// const pythonCode = `
// System.out.println("Hello")
// `;

// // highlightAuto sẽ tự động quét và đoán ngôn ngữ
// const result = hljs.highlightAuto(pythonCode);

// console.log(result.language); // Kết quả: 'python'
// console.log(result.relevance); // Điểm độ tin cậy (càng cao càng chắc chắn)
// Cài đặt thư viện chính thức: npm install @vscode/vscode-languagedetection

import { ModelOperations } from '@vscode/vscode-languagedetection';

const code = `
echo Hello
`;

// Bọc vào một hàm async để chạy
async function detectLanguage() {
  try {
    // Khởi tạo model của VS Code
    const model = new ModelOperations();
    
    // Quét chuỗi code
    const result = await model.runModel(code);
    
    console.log("Kết quả nhận diện:");
    console.log(result); 
    
    // In ra ngôn ngữ có tỷ lệ chính xác cao nhất
    if (result.length > 0) {
      console.log(`\n=> Ngôn ngữ được đoán là: ${result[0].languageId} (Độ tự tin: ${result[0].confidence})`);
    }

  } catch (error) {
    console.error("Đã xảy ra lỗi trong quá trình nhận diện:", error);
  }
}

// Gọi hàm
detectLanguage();