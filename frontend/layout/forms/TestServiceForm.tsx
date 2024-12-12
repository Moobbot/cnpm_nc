import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListSubheader,
  Typography,
  Checkbox,
  ListItemText,
} from "@mui/material";

const TestServiceForm = () => {
  const [selectedItems, setSelectedItems] = useState<{ name: string; description: string }[]>([]);

  const data = [
    {
      category: "Nhóm sinh hóa",
      items: [
        { name: "AMA-M2", description: "Chẩn đoán sớm bệnh xơ gan mật nguyên phát" },
        { name: "SCC", description: "Dấu ấn ung thư tế bào vảy vùng họng, cổ tử cung" },
        { name: "Pro GRP", description: "Dấu ấn ung thư phổi tế bào nhỏ phương pháp mới" },
        { name: "CEA", description: "Chỉ số phát hiện ung thư đường tiêu hóa" },
        { name: "AFP", description: "Đánh giá ung thư gan nguyên phát" },
      ],
    },
    {
      category: "Miễn dịch",
      items: [
        { name: "HAVAb IgM", description: "Xác định tình trạng viêm gan A cấp hay tái nhiễm" },
        { name: "HAVAb IgG", description: "Xác định tình trạng miễn dịch sau nhiễm viêm gan A" },
        { name: "HBV Genotype", description: "Xác định kiểu gen của viêm gan B" },
        { name: "HCV RNA", description: "Định lượng virus viêm gan C" },
        { name: "Rubella IgG", description: "Đánh giá tình trạng miễn dịch với Rubella" },
      ],
    },
    {
      category: "Huyết học",
      items: [
        { name: "RBC", description: "Số lượng hồng cầu trong máu" },
        { name: "WBC", description: "Số lượng bạch cầu trong máu" },
        { name: "Hemoglobin", description: "Nồng độ hemoglobin trong máu" },
        { name: "Platelets", description: "Số lượng tiểu cầu trong máu" },
        { name: "ESR", description: "Tốc độ máu lắng" },
      ],
    },
    {
      category: "Nội tiết",
      items: [
        { name: "TSH", description: "Đánh giá chức năng tuyến giáp" },
        { name: "T3", description: "Đánh giá hormone tuyến giáp T3" },
        { name: "T4", description: "Đánh giá hormone tuyến giáp T4" },
        { name: "Insulin", description: "Đo mức insulin trong máu" },
        { name: "Cortisol", description: "Đánh giá chức năng tuyến thượng thận" },
      ],
    },
    {
      category: "Vi sinh",
      items: [
        { name: "Gram Stain", description: "Xác định loại vi khuẩn qua nhuộm gram" },
        { name: "Blood Culture", description: "Phát hiện nhiễm trùng huyết" },
        { name: "Urine Culture", description: "Đánh giá vi khuẩn trong nước tiểu" },
        { name: "Sputum Culture", description: "Phân tích vi khuẩn trong đờm" },
        { name: "TB PCR", description: "Chẩn đoán lao qua PCR" },
      ],
    },
    {
      category: "Hóa sinh lâm sàng",
      items: [
        { name: "Glucose", description: "Đánh giá đường huyết" },
        { name: "Urea", description: "Đánh giá chức năng thận" },
        { name: "Creatinine", description: "Theo dõi chức năng thận" },
        { name: "Cholesterol", description: "Đánh giá mỡ máu" },
        { name: "Triglycerides", description: "Theo dõi chất béo trung tính trong máu" },
      ],
    },
  ];
  

  const handleToggle = (item: { name: string; description: string }) => {
    setSelectedItems((prev) =>
      prev.find((selected) => selected.name === item.name)
        ? prev.filter((selected) => selected.name !== item.name) // Bỏ chọn
        : [...prev, item] // Chọn mới
    );
  };

  const isSelected = (item: { name: string; description: string }) =>
    selectedItems.some((selected) => selected.name === item.name);

  return (
    <Box>
      <h3>Dịch vụ xét nghiệm</h3>
      <Box display="flex" gap={4}>
        {/* Danh sách nguồn */}
        <Box flex={1}>
          <Typography variant="h6" gutterBottom>
            Danh mục xét nghiệm
          </Typography>
          <List
            sx={{
              width: "100%",
              maxHeight: 300,
              overflow: "auto",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            {data.map((group) => (
              <React.Fragment key={group.category}>
                <ListSubheader
                  sx={{
                    backgroundColor: "#E5E9EB",
                  }}
                >
                  {group.category}
                </ListSubheader>
                {group.items.map((item) => (
                  <ListItem key={item.name} dense>
                    <Checkbox
                      edge="start"
                      checked={isSelected(item)}
                      onChange={() => handleToggle(item)}
                    />
                    <ListItemText
                      primary={item.name}
                      secondary={item.description}
                    />
                  </ListItem>
                ))}
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* Danh sách đích */}
        <Box flex={1}>
          <Typography variant="h6" gutterBottom>
            Dịch vụ đã chọn
          </Typography>
          <List
            sx={{
              width: "100%",
              maxHeight: 300,
              overflow: "auto",
              border: "1px solid #ddd",
              borderRadius: "4px",
            }}
          >
            {selectedItems.map((item) => (
              <ListItem key={item.name} dense>
                <Checkbox
                  edge="start"
                  checked={true}
                  onChange={() => handleToggle(item)} // Bỏ chọn nếu nhấn
                />
                <ListItemText
                  primary={item.name}
                  secondary={item.description}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default TestServiceForm;
