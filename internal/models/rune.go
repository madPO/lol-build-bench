package models

type Rune struct {
	ID          string `json:"id" ch:"id"`
	BranchID    string `json:"branchId" ch:"treeId"`
	Name        string `json:"name" ch:"name"`
	Description string `json:"description" ch:"longDesc"`
	IconURL     string `json:"iconUrl"`
	Tier        int    `json:"tier"`
}

type RuneBranch struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	IconURL string `json:"iconUrl"`
	Color   string `json:"color"`
}
